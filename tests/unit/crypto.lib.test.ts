import { encryptPersonalId, decryptPersonalId } from "../../src/lib/crypto";

describe("crypto lib utility", () => {
  it("should successfully encrypt and decrypt personal IDs using AES-256-GCM", () => {
    const originalId = "01001100222";
    const encryptedResult = encryptPersonalId(originalId);

    expect(encryptedResult).toHaveProperty("encrypted");
    expect(encryptedResult).toHaveProperty("iv");
    expect(encryptedResult).toHaveProperty("authTag");

    expect(typeof encryptedResult.encrypted).toBe("string");
    expect(typeof encryptedResult.iv).toBe("string");
    expect(typeof encryptedResult.authTag).toBe("string");

    const decrypted = decryptPersonalId(
      encryptedResult.encrypted,
      encryptedResult.iv,
      encryptedResult.authTag
    );

    expect(decrypted).toBe(originalId);
  });

  it("should generate distinct ciphertexts and IVs for identical plaintexts", () => {
    const text = "01001100222";
    const res1 = encryptPersonalId(text);
    const res2 = encryptPersonalId(text);

    expect(res1.iv).not.toBe(res2.iv);
    expect(res1.encrypted).not.toBe(res2.encrypted);
  });

  it("should fail decryption if ciphertext or authentication tag is modified", () => {
    const text = "01001100222";
    const res = encryptPersonalId(text);

    // Tamper with ciphertext
    const lastTwo = res.encrypted.substring(res.encrypted.length - 2);
    const tamperedCipher = res.encrypted.substring(0, res.encrypted.length - 2) + (lastTwo === "00" ? "11" : "00");

    expect(() => {
      decryptPersonalId(tamperedCipher, res.iv, res.authTag);
    }).toThrow();
  });
});
