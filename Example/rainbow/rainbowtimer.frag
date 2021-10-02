varying float X, Y;
varying vec3 MCposition;
varying float LightIntensity; 

uniform float DeltaScale;
uniform float A;
uniform float Tol;
uniform sampler3D Noise3;
uniform float Timer;
uniform float Speed;


vec4 Red	= { 1., 0., 0., 1. };
vec4 Orange	= { 1., .5, 0., 1. };
vec4 Yellow	= { 1., 1., 0., 1. };
vec4 Green	= { 0., 1., 0., 1. };
vec4 Cyan	= { 0., 1., 1., 1. };
vec4 Blue	= { 0., 0., 1., 1. };
vec4 Magenta	= { 1., 0., 1., 1. };
vec4 White	= { 1., 1., 1., 1. };

float ONE16      = 1./16.;
float THREE16    = 3./16.;
float FIVE16     = 5./16.;
float SEVEN16    = 7./16.;
float NINE16     = 9./16.;
float ELEVEN16   = 11./16.;
float THIRTEEN16 = 13./16.;
float FIFTEEN16  = 15./16.;

// return 0. if < left-tol or > right+tol
// return 1. if >= left+tol and <= right-tol
// else blend

float
Pulse( float value, float left, float right, float tol )
{
	float t = (  smoothstep( left-tol, left+tol, value )  -  smoothstep( right-tol, right+tol, value )  );
	return t;
}


void
main( void )
{
	const float PI = 3.14159265;
	float time = sin( 2.*PI*Timer*Speed );

	vec4  noisevec  = texture3D( Noise3, MCposition );
	float n = noisevec[0] + noisevec[1] + noisevec[2] + noisevec[3];	// 1. -> 3.
	// n = ( n - 1. ) / 2.;			// 0. -> 1.
	n = ( n - 2. );				// -1. -> 1.
	float deltax = DeltaScale * n * time;


	float f = fract(  A*(X+deltax) );
	float t = smoothstep( ONE16 - Tol, ONE16 + Tol, f );
	gl_FragColor = mix( White, Red, t );
	if( f >= THREE16 - Tol )
	{
		t = smoothstep( THREE16 - Tol, THREE16 + Tol, f );
		gl_FragColor = mix( Red, Orange, t );
	}
	if( f >= FIVE16 - Tol )
	{
		t = smoothstep( FIVE16 - Tol, FIVE16 + Tol, f );
		gl_FragColor = mix( Orange, Yellow, t );
	}
	if( f >= SEVEN16 - Tol )
	{
		t = smoothstep( SEVEN16 - Tol, SEVEN16 + Tol, f );
		gl_FragColor = mix( Yellow, Green, t );
	}
	if( f >= NINE16 - Tol )
	{
		t = smoothstep( NINE16 - Tol, NINE16 + Tol, f );
		gl_FragColor = mix( Green, Cyan, t );
	}
	if( f >= ELEVEN16 - Tol )
	{
		t = smoothstep( ELEVEN16 - Tol, ELEVEN16 + Tol, f );
		gl_FragColor = mix( Cyan, Blue, t );
	}
	if( f >= THIRTEEN16 - Tol )
	{
		t = smoothstep( THIRTEEN16 - Tol, THIRTEEN16 + Tol, f );
		gl_FragColor = mix( Blue, Magenta, t );
	}

	if( f >= FIFTEEN16 - Tol )
	{
		t = smoothstep( FIFTEEN16 - Tol, FIFTEEN16 + Tol, f );
		gl_FragColor = mix( Magenta, White, t );
	}
	
	gl_FragColor.rgb *= LightIntensity;
}
