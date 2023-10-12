/**
 * @module Gliesereum
 * A cryptocurrency utility library specialized for creating and managing wallets.
 * Developed by Pavlo Chabanov, 2023.
 */

import {ec} from "elliptic";
import {Buffer} from "buffer";
import bs58 from "bs58";
import {SHA256} from "crypto-js";
import {ripemd160} from "@noble/hashes/ripemd160";

const CHECKSUM_SIZE = 1;
const EC = new ec('secp256k1');

/** @typedef Wallet */
export interface Wallet {
  publicKey: string;
  privateKey: string;
  address: string;
  number: number;
}

/**
 * @function getAddress
 * @param {Buffer} bytes - Public key bytes.
 * @returns {string} Unique wallet address.
 */
function getAddress(bytes: Buffer): string {
  const pubKeyHash = createHash(bytes);
  const versionAndHash = Buffer.concat([Buffer.from([0x90]), pubKeyHash]);
  const checksum = createChecksum(versionAndHash);
  const fullPayload = Buffer.concat([versionAndHash, checksum]);
  return bs58.encode(fullPayload);
}

/**
 * @function createWallet
 * @returns {Wallet} Newly created wallet with public/private keys, address, and a unique number.
 */
function createWallet(): Wallet {
  const pair = EC.genKeyPair();
  const publicKey = pair.getPublic('hex');
  const privateKey = pair.getPrivate('hex');
  const concatenatedPubKey = Buffer.from(pair.getPublic().encode('array', true));
  const address = getAddress(concatenatedPubKey);
  return {
    publicKey,
    privateKey,
    address,
    number: cardNumber(address)
  };
}

/**
 * @private
 * @function createHash
 * @param {Buffer} bytes - Input buffer for hashing.
 * @returns {Buffer} Resultant hash after SHA256 and RIPEMD160.
 */
function createHash(bytes: Buffer): Buffer {
  const sha256Hash = SHA256(bytes.toString('utf8')).toString();
  return Buffer.from(ripemd160.create().update(Buffer.from(sha256Hash, 'utf8')).digest());
}

/**
 * @private
 * @function createChecksum
 * @param {Buffer} bytes - Input buffer for generating checksum.
 * @returns {Buffer} Checksum buffer.
 */
function createChecksum(bytes: Buffer): Buffer {
  return createHash(createHash(bytes)).slice(0, CHECKSUM_SIZE);
}

/**
 * @function recover
 * @param {string} data - Original signed data.
 * @param {ec.Signature} sig - ECDSA signature.
 * @returns {string} Recovered public key or 'invalid' if recovery fails.
 */
function recover(data: string, sig: ec.Signature): string {
  try {
    if (typeof sig.recoveryParam === "number") {
      const recovered = EC.recoverPubKey(data, sig, sig.recoveryParam, "hex");
      return recovered.encodeCompressed("hex");
    }
  } catch (error) {
    console.error("Failed to recover the public key:", error);
  }
  return "invalid";  // Default return value in case of failure
}

/**
 * @function sign
 * @param {string} data - Data to sign.
 * @param {string} key - Private key to sign with.
 * @returns {ec.Signature} ECDSA signature.
 */
function sign(data: string, key: string): ec.Signature {
  return EC.sign(data, Buffer.from(key, 'hex'), "hex", {canonical: true});
}

/**
 * @function validateAddress
 * @param {string} address - Cryptocurrency wallet address.
 * @returns {boolean} Whether the address is valid or not.
 */
function validateAddress(address: string): boolean {
  const decodedKey = bs58.decode(address);
  const version = decodedKey[0];
  const payload = decodedKey.slice(1, -CHECKSUM_SIZE);
  const actualChecksum = decodedKey.slice(-CHECKSUM_SIZE);
  const targetChecksum = createChecksum(Buffer.concat([Buffer.from([version]), payload]));
  return Buffer.compare(targetChecksum, actualChecksum) === 0;
}


/**
 * @function verify
 * @param {string} data - Original data to verify.
 * @param {ec.Signature} sig - ECDSA signature.
 * @param {string} publicKey - Public key to verify against.
 * @returns {boolean} Whether the data was signed by the corresponding private key or not.
 */
function verify(data: string, sig: ec.Signature, publicKey: string): boolean {
  return EC.verify(data, sig, Buffer.from(publicKey, "hex"), "hex");
}

/**
 * @function cardNumber
 * @param {string} input - Typically an address or similar string.
 * @returns {number} A unique 16-digit number derived from the input.
 */
function cardNumber(input: string): number {
  const hash = SHA256(input);
  const num = parseInt(hash.toString().substr(0, 16), 16);
  return 1000000000000000 + (num % 9000000000000000);
}

/**
 * @function importFromPrivateKey
 * @param {string} pKeyHex - Hex representation of a private key.
 * @returns {Wallet} Wallet details constructed from the private key.
 */
function importFromPrivateKey(pKeyHex: string): Wallet {
  const keyPair = EC.keyFromPrivate(pKeyHex);  // Get the key pair from the provided private key
  const concatenatedPubKey = Buffer.from(keyPair.getPublic().encode('array', true));
  const address = getAddress(concatenatedPubKey);
  return {
    publicKey: keyPair.getPublic("hex"),
    privateKey: keyPair.getPrivate("hex"),
    address,
    number: cardNumber(address)
  };
}

const Gliesereum = {
  createWallet,
  validateAddress,
  sign,
  verify,
  recover,
  cardNumber,
  importFromPrivateKey
};

export default Gliesereum;
