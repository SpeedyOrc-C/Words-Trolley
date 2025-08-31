import {Phoneme as P} from "$lib/word/egyptian/index"
import {Glyph as G} from "$lib/word/egyptian/glyph"
import {g, v, h, type Hieroglyphics} from "$lib/word/egyptian/hieroglyphics"

type HieroglyphicsPrefixTree = {
	[prefix: string]: [
		Hieroglyphics[],
		HieroglyphicsPrefixTree
	]
}

const dictionary: HieroglyphicsPrefixTree = {
	[P.a]: [[
		g(G.C_a),
	], {
	}],
	[P.i]: [[
		g(G.C_i),
	], {
		[P.b]: [[
			g(G.C_ib),
		], {}],
	}],
	[P.y]: [[
		g(G.C_y),
	], {
	}],
	[P.e]: [[
		g(G.C_e),
	], {
		[P.n]: [[], {
			[P.x]: [[
				g(G.C_enx)
			], {}],
		}],
	}],
	[P.w]: [[
		g(G.C_w),
	], {
	}],
	[P.b]: [[
		g(G.C_b),
	], {
		[P.a]: [[
			g(G.C_ba),
		], {}],
	}],
	[P.p]: [[
		g(G.C_p),
	], {
		[P.r]: [[
			g(G.C_pr),
			v(g(G.C_pr), g(G.D_identity)),
		], {
			[P.t]: [[], {
				[P.x]: [[], {
					[P.r]: [[], {
						[P.w]: [[
							g(G.L_voice_offering),
						], {}]
					}]
				}]
			}]
		}],
		[P.q]: [[], {
			[P.r]: [[
				h(v(h(g(G.C_p), g(G.C_q)), g(G.C_r)), g(G.D_city)),
			], {}],
		}],
	}],
	[P.f]: [[
		g(G.C_f),
	], {
	}],
	[P.m]: [[
		g(G.C_m),
	], {
		[P.a]: [[
			g(G.C_ma),
		], {
			[P.e]: [[
				g(G.C_mae),
			], {}],
		}],
		[P.s]: [[
			g(G.C_ms),
		], {}],
	}],
	[P.n]: [[
		g(G.C_n),
	], {
		[P.b]: [[
			g(G.C_nb)
		], {
			[P.t]: [[], {
				[P.a]: [[], {
					[P.w]: [[], {
						[P.y]: [[
							v(g(G.C_nb), g(G.D_earth), g(G.D_earth)),
						], {}]
					}]
				}]
			}]
		}],
		[P.c]: [[], {
			[P.r]: [[
				g(G.C_ncr)
			], {
				[P.w]: [[
					h(g(G.C_ncr), g(G.C_ncr), g(G.C_ncr)),
				], {}],
			}],
		}],
		[P.s]: [[], {
			[P.w]: [[
				h(g(G.C_sw), v(g(G.C_t), g(G.C_n))),
			], {
				[P.b]: [[], {
					[P.i]: [[], {
						[P.t]: [[], {
							[P.y]: [[
								h(v(g(G.C_sw), g(G.C_t)), v(g(G.D_bee), g(G.C_t)))
							], {}]
						}]
					}]
				}]
			}],
		}]
	}],
	[P.r]: [[
		g(G.C_r),
	], {
		[P.e]: [[
			g(G.C_re),
		], {}],
	}],
	[P.h]: [[
		g(G.C_h),
	], {}],
	[P.H]: [[
		g(G.C_H),
	], {
	}],
	[P.x]: [[
		g(G.C_x),
	], {
		[P.a]: [[
			g(G.C_xa),
		], {}],
		[P.r]: [[], {
			[P.w]: [[
				g(G.C_xrw),
			], {}],
		}],
		[P.t]: [[
			v(h(g(G.C_x), g(G.C_t)), g(G.D_papyrus), g(G.D_plural)),
		], {}],
	}],
	[P.C]: [[
		g(G.C_C),
	], {
	}],
	[P.s]: [[
		g(G.C_s),
	], {
		[P.t]: [[
			g(G.C_st),
		], {}],
		[P.w]: [[
			g(G.C_sw),
		], {}],
	}],
	[P.z]: [[
		g(G.C_z),
	], {
	}],
	[P.S]: [[
		g(G.C_S),
	], {
	}],
	[P.k]: [[
		g(G.C_k),
	], {
		[P.a]: [[
			g(G.C_ka),
			v(g(G.C_ka), g(G.D_identity)),
			h(g(G.C_ka), g(G.D_identity)),
		], {}],
	}],
	[P.g]: [[
		g(G.C_g),
	], {
	}],
	[P.q]: [[
		g(G.C_q),
	], {
	}],
	[P.t]: [[
		g(G.C_t),
	], {
	}],
	[P.c]: [[
		g(G.C_c),
	], {
	}],
	[P.d]: [[
		g(G.C_d),
	], {
	}],
	[P.j]: [[
		g(G.C_j),
	], {
		[P.d]: [[
			g(G.C_jd),
		], {}],
	}],
}

export default dictionary
