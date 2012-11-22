package com.freizl.fp;

import java.util.List;

import com.freizl.fp.FP.FoldlFunc;
import com.freizl.fp.op.AddFloat;
import com.freizl.fp.op.AddLong;

public final class FPOp {

	public final static FoldlFunc<Long, Long> addLong = new AddLong();

	public final static FoldlFunc<Float, Float> addFloat = new AddFloat();

	public static Float sumFloat(List<Float> xs) {
		return FP.foldl(addFloat, xs, Float.valueOf(0));
	}
}
