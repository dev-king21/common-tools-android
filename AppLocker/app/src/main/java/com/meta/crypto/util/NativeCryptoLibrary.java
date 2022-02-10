package com.meta.crypto.util;

import com.meta.crypto.exception.CryptoInitializationException;

/**
 * Represents the native libraries for cryptographic utils.
 */
public interface NativeCryptoLibrary {

    /**
     * loads libraries (if not loaded yet), throws on failure.
     * @throws CryptoInitializationException
     */
    public void ensureCryptoLoaded() throws CryptoInitializationException;
}
