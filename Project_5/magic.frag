#version 330 compatibility

uniform bool useCircle;
uniform float uSc;
uniform float uTc;
uniform float uDs;  
uniform float uDt;
uniform float uRadius; 
uniform float uMagFactor; 
uniform float uRotAngle; 
uniform float uSharpFactor;
uniform sampler2D uImageUnit;

in vec2 vST;

const vec4  WHITE = vec4( 1.,1.,1.,1. );

void main( )
{
	if (useCircle == false)
	{
		if(uSc - uDs < vST.s && vST.s < uSc + uDs && uTc - uDt < vST.t && vST.t < uTc + uDt)
		{
			ivec2 ires = textureSize( uImageUnit, 0 );
			float ResS = float( ires.s );
			float ResT = float( ires.t );

			float get_s = (vST.s - uSc) / uMagFactor;
			float get_t = (vST.t - uTc) / uMagFactor;
			
			//rotate
			float get_s1 = uSc + get_s*cos(uRotAngle) - get_t*sin(uRotAngle);
			float get_t1 = uTc + get_s*sin(uRotAngle) + get_t*cos(uRotAngle);
			vec2 Mag_s = vec2(get_s1, get_t1);

			//sharpen
			vec2 stp0 = vec2(1./ResS,  0. );
			vec2 st0p = vec2(0.     ,  1./ResT);
			vec2 stpp = vec2(1./ResS,  1./ResT);
			vec2 stpm = vec2(1./ResS, -1./ResT);
			vec3 i00 =   texture2D( uImageUnit, Mag_s ).rgb;
			vec3 im1m1 = texture2D( uImageUnit, Mag_s-stpp ).rgb;
			vec3 ip1p1 = texture2D( uImageUnit, Mag_s+stpp ).rgb;
			vec3 im1p1 = texture2D( uImageUnit, Mag_s-stpm ).rgb;
			vec3 ip1m1 = texture2D( uImageUnit, Mag_s+stpm ).rgb;
			vec3 im10 =  texture2D( uImageUnit, Mag_s-stp0 ).rgb;
			vec3 ip10 =  texture2D( uImageUnit, Mag_s+stp0 ).rgb;
			vec3 i0m1 =  texture2D( uImageUnit, Mag_s-st0p ).rgb;
			vec3 i0p1 =  texture2D( uImageUnit, Mag_s+st0p ).rgb;
			vec3 target = vec3(0.,0.,0.);
			target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
			target += 2.*(im10+ip10+i0m1+i0p1);
			target += 4.*(i00);
			target /= 16.; 

			vec3 irgb = texture2D( uImageUnit, Mag_s).rgb;
			gl_FragColor = vec4( mix( target, irgb, uSharpFactor ), 1. );
		}else{
			vec3 newcolor = texture( uImageUnit, vST ).rgb;
			gl_FragColor = vec4( newcolor, 1. );
		}
	}else{
		int numins = int( vST.s / uRadius );
		int numint = int( vST.t / uRadius );

		float Ar = uRadius/2.;
		float Br = uRadius/2.;
		float sc = numins *uRadius + Ar;
		float tc = numint *uRadius + Br;

		float rfrac = (vST.s-uSc)*(vST.s-uSc) / (Ar*Ar) + 
					  (vST.t-uTc)*(vST.t-uTc) / (Br*Br);

		if(rfrac < 1)
		{
			ivec2 ires = textureSize( uImageUnit, 0 );
			float ResS = float( ires.s );
			float ResT = float( ires.t );

			float get_s = (vST.s - uSc) / uMagFactor;
			float get_t = (vST.t - uTc) / uMagFactor;
			
			//rotate
			float get_s1 = uSc + get_s*cos(uRotAngle) - get_t*sin(uRotAngle);
			float get_t1 = uTc + get_s*sin(uRotAngle) + get_t*cos(uRotAngle);
			vec2 Mag_s = vec2(get_s1, get_t1);

			//sharpen
			vec2 stp0 = vec2(1./ResS,  0. );
			vec2 st0p = vec2(0.     ,  1./ResT);
			vec2 stpp = vec2(1./ResS,  1./ResT);
			vec2 stpm = vec2(1./ResS, -1./ResT);
			vec3 i00 =   texture2D( uImageUnit, Mag_s ).rgb;
			vec3 im1m1 = texture2D( uImageUnit, Mag_s-stpp ).rgb;
			vec3 ip1p1 = texture2D( uImageUnit, Mag_s+stpp ).rgb;
			vec3 im1p1 = texture2D( uImageUnit, Mag_s-stpm ).rgb;
			vec3 ip1m1 = texture2D( uImageUnit, Mag_s+stpm ).rgb;
			vec3 im10 =  texture2D( uImageUnit, Mag_s-stp0 ).rgb;
			vec3 ip10 =  texture2D( uImageUnit, Mag_s+stp0 ).rgb;
			vec3 i0m1 =  texture2D( uImageUnit, Mag_s-st0p ).rgb;
			vec3 i0p1 =  texture2D( uImageUnit, Mag_s+st0p ).rgb;
			vec3 target = vec3(0.,0.,0.);
			target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
			target += 2.*(im10+ip10+i0m1+i0p1);
			target += 4.*(i00);
			target /= 16.; 

			vec3 irgb = texture2D( uImageUnit, Mag_s).rgb;
			gl_FragColor = vec4( mix( target, irgb, uSharpFactor ), 1. );
		}else{
			vec3 newcolor = texture( uImageUnit, vST ).rgb;
			gl_FragColor = vec4( newcolor, 1. );
		}
	}
} 