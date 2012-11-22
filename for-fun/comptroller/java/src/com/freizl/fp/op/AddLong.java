package com.freizl.fp.op;

import com.freizl.fp.FP;

public final class AddLong implements FP.FoldlFunc<Long, Long> {
	@Override
	public Long apply(Long init, Long t2) {
		return init + t2;
	}
}