#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uAlpha;
uniform float uTol;
uniform float Timer;
uniform float Speed;
uniform sampler3D Noise3;

uniform float Center;
uniform float TimePosition;
uniform float Amp;
uniform float Period;
uniform float LightX, LightY, LightZ;
uniform vec2 u_resolution;
in vec2 vST;
in vec3 MCposition;
in vec3 ECposition;

//Rainbow colors
//Refer https://blog.csdn.net/Scotfield_msn/article/details/52564829
vec4 RED	=  vec4(1., 0., 0., 1.);
vec4 ORANGE	= vec4(1., .5, 0., 1.);
vec4 YELLOW	= vec4(1., 1., 0., 1.);
vec4 GREEN	= vec4(0., 1., 0., 1.);
vec4 BLUE	= vec4(0., 0., 1., 1.);
vec4 INDIGO	= vec4(0., 1., 1., 1.);
vec4 PURPLE	= vec4(.5, 0., 1., 1.);
vec4 White = vec4( 1., 1., 1., uAlpha);

float ONE16      = 1./16.;
float THREE16    = 3./16.;
float FIVE16     = 5./16.;
float SEVEN16    = 7./16.;
float NINE16     = 9./16.;
float ELEVEN16   = 11./16.;
float THIRTEEN16 = 13./16.;
float FIFTEEN16  = 15./16.;

void
main( )
{
	vec4 nv = texture3D( Noise3, uNoiseFreq * MCposition );
  	float n = nv.r + nv.g + nv.b + nv.a; // range is 1. -> 3.
	n = n - 2.; // range is now -1. -> 1.
	n *= uNoiseAmp;
	
	int numins = int( vST.s / uAd );
	int numint = int( vST.t / uBd );

	float Ar = uAd/2.;
	float Br = uBd/2.;

	float sc = float(numins) * uAd  +  Ar;
	float ds = vST.s - sc;                   // wrt ellipse center
	float tc = float(numint) * uBd  +  Br;
	float dt = vST.t - tc;                   // wrt ellipse center

	float oldDist = sqrt( ds*ds + dt*dt );
	float newDist = oldDist + n;
	float scale = newDist / oldDist; // this could be < 1., = 1., or > 1.

	ds *= scale; // scale by noise factor
	ds /= Ar; // ellipse equation
	dt *= scale; // scale by noise factor
	dt /= Br; // ellipse equation
	float rfrac = ds*ds + dt*dt;

	/***********Compute vanished circles***********/
  	const float PI = 3.14159265;
  	vec3 center = vec3( Center, 0., 0. );

  	float radius = length( MCposition - center );

  	float ua = Amp * (PI/Period) * sin( PI*radius/Period - PI*TimePosition); 
	float va = 0.;
	float wa = 1.;

  	vec3 normal = normalize( vec3( ua, va, wa ) );

	float vLightIntensity  = 1. * abs( dot( normalize(vec3(LightX,LightY,LightZ) - ECposition), normal ) );
	if( vLightIntensity < 0.1 )
	{
		vLightIntensity = 0.1;
	}

	/***********Calculate the time change and color distribution***********/
	//const float PI = 3.14159265;
	float time = sin( PI*Timer*Speed );

	rfrac *= time;

	float t = smoothstep( ONE16 - uTol, ONE16 + uTol, rfrac );
	gl_FragColor = mix( White, RED, t );
 	 vec4 Mix = mix( White, RED, t );
  	if (Mix == vec4(1.,1.,1.,0.))
    	discard ;
	if( rfrac >= THREE16 - uTol )
	{
		t = smoothstep( THREE16 - uTol, THREE16 + uTol, rfrac );
		gl_FragColor = mix( RED, ORANGE, t );
	}
	if( rfrac >= FIVE16 - uTol )
	{
		t = smoothstep( FIVE16 - uTol, FIVE16 + uTol, rfrac );
		gl_FragColor = mix( ORANGE, YELLOW, t );
	}
	if( rfrac >= SEVEN16 - uTol )
	{
		t = smoothstep( SEVEN16 - uTol, SEVEN16 + uTol, rfrac );
		gl_FragColor = mix( YELLOW, GREEN, t );
	}
	if( rfrac >= NINE16 - uTol )
	{
		t = smoothstep( NINE16 - uTol, NINE16 + uTol, rfrac );
		gl_FragColor = mix( GREEN, INDIGO, t );
	}
	if( rfrac >= ELEVEN16 - uTol )
	{
		t = smoothstep( ELEVEN16 - uTol, ELEVEN16 + uTol, rfrac );
		gl_FragColor = mix( INDIGO, BLUE, t );
	}
	if( rfrac >= THIRTEEN16 - uTol )
	{
		t = smoothstep( THIRTEEN16 - uTol, THIRTEEN16 + uTol, rfrac );
		gl_FragColor = mix( BLUE, PURPLE, t );
	}

	if( rfrac >= FIFTEEN16 - uTol )
	{
		t = smoothstep( FIFTEEN16 - uTol, FIFTEEN16 + uTol, rfrac );
		gl_FragColor = mix( PURPLE, White, t );
    vec4 Mix = mix( PURPLE, White, t );
    if (Mix == vec4(1.,1.,1.,0.))
      discard ;
	}
  
  
  gl_FragColor.rgb *= vLightIntensity;

  
}
