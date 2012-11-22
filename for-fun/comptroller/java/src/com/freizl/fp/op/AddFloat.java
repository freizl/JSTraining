package com.freizl.fp.op;

import com.freizl.fp.FP;

public final class AddFloat implements FP.FoldlFunc<Float, Float> {
	@Override
	public Float apply(Float init, Float t2) {
		return init + t2;
	}
}