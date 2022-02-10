package com.meta.crypto;

import com.meta.crypto.keychain.KeyChain;
import com.meta.crypto.keygen.PasswordBasedKeyDerivation;
import com.meta.crypto.util.NativeCryptoLibrary;
import java.security.SecureRandom;

/**
 * Factory class to create cryptographic components.
 * It's configured with the support components to use:
 * <ul>
 * <li>native library loader</li>
 * <li>random number generator</li>
 * </ul>
 * For Android please use {@link com.meta.android.crypto.keychain.AndroidConceal}.
 * @see com.meta.android.crypto.keychain.AndroidConceal#get()
 */
public abstract class Conceal {

    public final NativeCryptoLibrary nativeLibrary;
    public final SecureRandom secureRandom;

    protected Conceal(NativeCryptoLibrary nativeLibrary, SecureRandom secureRandom) {
        this.nativeLibrary = nativeLibrary;
        this.secureRandom = secureRandom;
    }

    /**
     * Creates a Crypto with the current default configuration for Conceal: 256-bit key.
     * <b>Warning:</b> if you need to read previous versions of Conceal data (1.0.x)
     * you will need to use the specific factory method and correct length key chain.
     * createCrypto128Bits(...). Otherwise data won't be correctly decrypted.
     * @see com.meta.android.crypto.keychain.SharedPrefsBackedKeyChain#SharedPrefsBackedKeyChain(android.content.Context, CryptoConfig)
     * @param keyChain a 256-bits KeyChain
     */
    public Crypto createDefaultCrypto(KeyChain keyChain) {
        return createCrypto256Bits(keyChain);
    }

    public Crypto createCrypto128Bits(KeyChain keyChain128Bits) {
        return new Crypto(keyChain128Bits, nativeLibrary, CryptoConfig.KEY_128);
    }

    public Crypto createCrypto256Bits(KeyChain keyChain256Bits) {
        return new Crypto(keyChain256Bits, nativeLibrary, CryptoConfig.KEY_256);
    }

    public PasswordBasedKeyDerivation createPasswordBasedKeyDerivation() {
        return new PasswordBasedKeyDerivation(secureRandom, nativeLibrary);
    }
}
