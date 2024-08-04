import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY;

if (!encryptionKey) {
	console.error('ENCRYPTION_KEY is not set in environment variables');
	process.exit(1);
}

const key = crypto.scryptSync(encryptionKey, 'salt', 32);
const iv = crypto.randomBytes(16);

export const encrypt = (text: string): string => {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return iv.toString('hex') + ':' + encrypted;
};

export const decrypt = (text: string): string => {
	const textParts = text.split(':');
	const ivHex = textParts.shift() || '';
	const encryptedText = textParts.join(':');
	const iv = Buffer.from(ivHex, 'hex');
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};
