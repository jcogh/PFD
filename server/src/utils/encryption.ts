import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const encrypt = (text: string, key: string): string => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string, key: string): string => {
	const textParts = text.split(':');
	const iv = Buffer.from(textParts.shift()!, 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

export const generateEncryptionKey = (): string => {
	return crypto.randomBytes(32).toString('hex');
};
