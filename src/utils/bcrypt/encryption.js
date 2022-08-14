"use strict";
exports.__esModule = true;
exports.decrypt = exports.encrypt = void 0;
var crypto_ = require("crypto");
var algorithm = "aes-256-cbc"; //Using AES encryption
var key = crypto_.randomBytes(32);
var iv = crypto_.randomBytes(16);
function encrypt(text) {
    var cipher = crypto_.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}
exports.encrypt = encrypt;
function decrypt(text) {
    var iv = Buffer.from(text.iv, "hex");
    var encryptedText = Buffer.from(text.encryptedData, "hex");
    var decipher = crypto_.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
