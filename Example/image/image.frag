

#define TOON


uniform sampler2D ImageUnit, BeforeUnit, AfterUnit;
uniform float T;
uniform float ResS, ResT;

uniform float MagTol;
uniform float Quantize;

void main()
{
	vec2 st = gl_TexCoord[0].st;
	vec3 irgb = texture2D( ImageUnit,  st ).rgb;
	vec3 brgb = texture2D( BeforeUnit, st ).rgb;
	vec3 argb = texture2D( AfterUnit,  st ).rgb;
	vec4 color = vec4( 1., 0., 0., 1. );
#ifdef BRIGHTNESS
	vec3 target = vec3( 0., 0., 0. );
	color = vec4( mix( target, irgb, T ), 1. );
#endif

#ifdef CONTRAST
	vec3 target = vec3( 0.5, 0.5, 0.5 );
	color = vec4( mix( target, irgb, T ), 1. );
#endif

#ifdef SATURATION
	float lum = dot( irgb, vec3(0.2125,0.7154,0.0721) );
	vec3 target = vec3( lum, lum, lum );
	color = vec4( mix( target, irgb, T ), 1. );
#endif

#ifdef DIFFERENCE
	vec3 target = abs( argb - brgb );
	if( T <= 1. )
		color = vec4( mix( argb, brgb, T ), 1. );
	else
		color = vec4( mix( brgb, target, T-1. ), 1. );
#endif

#ifdef DISSOLVE
	color = vec4( mix( argb, brgb, T ), 1. );
#endif

#ifdef SHARPNESS
	vec2 stp0 = vec2(1./ResS,  0. );
	vec2 st0p = vec2(0.     ,  1./ResT);
	vec2 stpp = vec2(1./ResS,  1./ResT);
	vec2 stpm = vec2(1./ResS, -1./ResT);
	vec3 i00 =   texture2D( ImageUnit, st ).rgb;
	vec3 im1m1 = texture2D( ImageUnit, st-stpp ).rgb;
	vec3 ip1p1 = texture2D( ImageUnit, st+stpp ).rgb;
	vec3 im1p1 = texture2D( ImageUnit, st-stpm ).rgb;
	vec3 ip1m1 = texture2D( ImageUnit, st+stpm ).rgb;
	vec3 im10 =  texture2D( ImageUnit, st-stp0 ).rgb;
	vec3 ip10 =  texture2D( ImageUnit, st+stp0 ).rgb;
	vec3 i0m1 =  texture2D( ImageUnit, st-st0p ).rgb;
	vec3 i0p1 =  texture2D( ImageUnit, st+st0p ).rgb;
	vec3 target = vec3(0.,0.,0.);
	target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
	target += 2.*(im10+ip10+i0m1+i0p1);
	target += 4.*(i00);
	target /= 16.;
	color = vec4( mix( target, irgb, T ), 1. );
#endif

#ifdef EDGE
	vec2 stp0 = vec2(1./ResS,  0. );
	vec2 st0p = vec2(0.     ,  1./ResT);
	vec2 stpp = vec2(1./ResS,  1./ResT);
	vec2 stpm = vec2(1./ResS, -1./ResT);
	float i00 =   dot( texture2D( ImageUnit, st ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im1m1 = dot( texture2D( ImageUnit, st-stpp ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip1p1 = dot( texture2D( ImageUnit, st+stpp ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im1p1 = dot( texture2D( ImageUnit, st-stpm ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip1m1 = dot( texture2D( ImageUnit, st+stpm ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im10 =  dot( texture2D( ImageUnit, st-stp0 ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip10 =  dot( texture2D( ImageUnit, st+stp0 ).rgb, vec3(0.2125,0.7154,0.0721) );
	float i0m1 =  dot( texture2D( ImageUnit, st-st0p ).rgb, vec3(0.2125,0.7154,0.0721) );
	float i0p1 =  dot( texture2D( ImageUnit, st+st0p ).rgb, vec3(0.2125,0.7154,0.0721) );
	float h = -1.*im1p1 - 2.*i0p1 - 1.*ip1p1  +  1.*im1m1 + 2.*i0m1 + 1.*ip1m1;
	float v = -1.*im1m1 - 2.*im10 - 1.*im1p1  +  1.*ip1m1 + 2.*ip10 + 1.*ip1p1;
	

	float mag = sqrt( h*h + v*v );
	vec3 target = vec3( mag,mag,mag );
	color = vec4( mix( irgb, target, T ), 1. );
#endif

#ifdef CHROMAKEY
	float r = irgb.r;
	float g = irgb.g;
	float b = irgb.b;
	color = vec4( irgb, 1. );
	float rlimit = T;
	float glimit = T;
	float blimit = 1. - T;
	if( r <= rlimit  &&  g <= glimit  &&  b >= blimit )
		color = vec4( brgb, 1. );
#endif


#ifdef TOON
	vec3 rgb = texture2D( ImageUnit, st ).rgb;
	vec2 stp0 = vec2(1./ResS,  0. );
	vec2 st0p = vec2(0.     ,  1./ResT);
	vec2 stpp = vec2(1./ResS,  1./ResT);
	vec2 stpm = vec2(1./ResS, -1./ResT);
	float i00 =   dot( texture2D( ImageUnit, st ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im1m1 = dot( texture2D( ImageUnit, st-stpp ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip1p1 = dot( texture2D( ImageUnit, st+stpp ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im1p1 = dot( texture2D( ImageUnit, st-stpm ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip1m1 = dot( texture2D( ImageUnit, st+stpm ).rgb, vec3(0.2125,0.7154,0.0721) );
	float im10 =  dot( texture2D( ImageUnit, st-stp0 ).rgb, vec3(0.2125,0.7154,0.0721) );
	float ip10 =  dot( texture2D( ImageUnit, st+stp0 ).rgb, vec3(0.2125,0.7154,0.0721) );
	float i0m1 =  dot( texture2D( ImageUnit, st-st0p ).rgb, vec3(0.2125,0.7154,0.0721) );
	float i0p1 =  dot( texture2D( ImageUnit, st+st0p ).rgb, vec3(0.2125,0.7154,0.0721) );
	float h = -1.*im1p1 - 2.*i0p1 - 1.*ip1p1  +  1.*im1m1 + 2.*i0m1 + 1.*ip1m1;
	float v = -1.*im1m1 - 2.*im10 - 1.*im1p1  +  1.*ip1m1 + 2.*ip10 + 1.*ip1p1;
	
	float mag = sqrt( h*h + v*v );
	if( mag > MagTol )
	{
		color = vec4( 0., 0., 0., 1. );
	}
	else
	{
		rgb.rgb *= Quantize;
		rgb.rgb += vec3( .5, .5, .5 );
		ivec3 irgb = ivec3( rgb.rgb );
		rgb.rgb = vec3( irgb ) / Quantize;
		color = vec4( rgb, 1. );
	}
#endif


	gl_FragColor = color;
}
