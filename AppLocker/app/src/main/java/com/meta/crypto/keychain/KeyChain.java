package com.meta.crypto.keychain;

import com.meta.crypto.exception.KeyChainException;
import com.meta.crypto.proguard.annotations.DoNotStrip;

public interface KeyChain {

    /**
     * Returns the key to use for encipherment.
     * @throws KeyChainException
     */
    @DoNotStrip
    public byte[] getCipherKey() throws KeyChainException;

    /**
     * Returns the key to use for integrity operations.
     * @throws KeyChainException
     */
    @DoNotStrip
    public byte[] getMacKey() throws KeyChainException;

    /**
     * Gets a new IV to use for encipherment operations.
     * @throws KeyChainException
     */
    @DoNotStrip
    public byte[] getNewIV() throws KeyChainException;

    /**
     * Destroys the existing keys of the keychain.
     */
    public void destroyKeys();
}