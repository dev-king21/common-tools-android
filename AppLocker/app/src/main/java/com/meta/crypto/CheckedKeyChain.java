package com.meta.crypto;

import com.meta.crypto.exception.KeyChainException;
import com.meta.crypto.keychain.KeyChain;

/**
 * Wrapper implementation of KeyChain.
 * Checks that returned arrays match the length specified by the config.
 * If there's a mismatch an IllegalStateArgument exception is thrown.
 */
public class CheckedKeyChain implements KeyChain {

    private final KeyChain mDelegate;
    private final CryptoConfig mConfig;

    /**
     * @param mDelegate the keychain to be checked
     * @param mConfig the configuration to be used
     */
    public CheckedKeyChain(KeyChain mDelegate, CryptoConfig mConfig) {
        this.mDelegate = mDelegate;
        this.mConfig = mConfig;
    }

    @Override
    public byte[] getCipherKey() throws KeyChainException {
        byte[] result = mDelegate.getCipherKey();
        checkLength(result, mConfig.keyLength, "Key");
        return result;
    }

    @Override
    public byte[] getMacKey() throws KeyChainException {
        byte[] result = mDelegate.getMacKey();
        checkLength(result, MacConfig.DEFAULT.keyLength, "Mac");
        return result;
    }

    @Override
    public byte[] getNewIV() throws KeyChainException {
        byte[] result = mDelegate.getNewIV();
        checkLength(result, mConfig.ivLength, "IV");
        return result;
    }

    @Override
    public void destroyKeys() {
        mDelegate.destroyKeys();
    }

    private void checkLength(byte[] key, int lengthInBytes, String name) {
        if (key.length != lengthInBytes) {
            throw new IllegalStateException(
                    name + " should be " + lengthInBytes + " bytes long but is " + key.length);
        }
    }
}