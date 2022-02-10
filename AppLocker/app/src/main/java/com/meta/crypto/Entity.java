package com.meta.crypto;

import java.nio.charset.Charset;

public class Entity {
    private static final Charset UTF_16 = Charset.forName("UTF-16");
    private static final Charset UTF_8 = Charset.forName("UTF-8");
    private final byte[] mBytes;

    @Deprecated
    public Entity(String name) {
        this.mBytes = name.getBytes(UTF_16);
    }

    private Entity(byte[] bytes) {
        this.mBytes = bytes;
    }

    public byte[] getBytes() {
        return this.mBytes;
    }

    @Deprecated
    public static Entity utf16(String name) {
        return new Entity(name);
    }

    public static Entity create(String name) {
        return new Entity(name.getBytes(UTF_8));
    }
}
