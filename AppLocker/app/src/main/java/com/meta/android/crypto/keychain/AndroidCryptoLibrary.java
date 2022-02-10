package com.meta.android.crypto.keychain;

import com.meta.crypto.exception.CryptoInitializationException;
import com.meta.crypto.util.NativeCryptoLibrary;
import com.meta.soloader.NativeLibrary;

import java.util.Arrays;


/**
 * An implementation of {@link NativeCryptoLibrary} that uses
 * {@link com.meta.soloader.SoLoader} to load the crypto libraries.
 */
public class AndroidCryptoLibrary extends NativeLibrary implements NativeCryptoLibrary {

    public AndroidCryptoLibrary() {
        super(Arrays.asList("meta", "concealjni"));
    }

    @Override
    public synchronized void ensureCryptoLoaded() throws CryptoInitializationException {
        try {
            super.ensureLoaded();
        } catch (RuntimeException re) {
            if (re.getMessage() != null && re.getMessage().contains("SoLoader.init")) {
                throw new RuntimeException(
                        "SoLoader not initialized. Check https://github.com/helios175/conceal/blob/master/README.md#important-initializing-the-library-loader",
                        re);
            }
            throw re;
        }
    }
}
