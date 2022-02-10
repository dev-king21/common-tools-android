package com.meta.jni;

import com.meta.proguard.annotations.DoNotStrip;
import com.meta.soloader.SoLoader;

@DoNotStrip
public class CpuCapabilitiesJni {
    @DoNotStrip
    public static native boolean nativeDeviceSupportsNeon();

    @DoNotStrip
    public static native boolean nativeDeviceSupportsVFPFP16();

    @DoNotStrip
    public static native boolean nativeDeviceSupportsX86();

    static {
        SoLoader.loadLibrary("meta");
    }
}
