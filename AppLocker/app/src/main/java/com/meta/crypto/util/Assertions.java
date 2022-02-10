package com.meta.crypto.util;

import java.io.IOException;

/**
 * Adaptation of certain methods required by us so that we don't have
 * to introduce a dependency on guava.
 */
public class Assertions {

    public static void checkState(boolean expression, String errorMessage) {
        if (!expression) {
            throw new IllegalStateException(errorMessage);
        }
    }

    public static void checkArgumentForIO(boolean expression, String errorMessage) throws IOException {
        if (!expression) {
            throw new IOException(errorMessage);
        }
    }
}
