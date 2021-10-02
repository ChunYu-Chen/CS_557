uniform float Length;
uniform sampler2D TexUnit;

void
main( void )
{
	vec2 v;
	int LengthP;
	float TwoOverRes = 2. / 512.;
	float OneOverNum = 1./(Length+Length+1.);
	vec3 color;
	
	// starting location:

	vec2 st = gl_TexCoord[0].st;
	vec2 tmp = st - vec2(.5,.5);
	v = vec2( -tmp.y, tmp.x );
	v *= TwoOverRes;

	color = vec3( texture2D( TexUnit, st ) );

	st = gl_TexCoord[0].st;
	LengthP = int( Length );
	for( int i = 0; i < LengthP; i++ )
	{
		st += v;
		st = clamp( st, 0., 1. );
		color += vec3( texture2D( TexUnit, st ) );
	}


	st = gl_TexCoord[0].st;
	LengthP = int( Length );
	for( int i = 0; i < LengthP; i++ )
	{
		st -= v;
		st = clamp( st, 0., 1. );
		color += vec3( texture2D( TexUnit, st ) );
	}

	
	color *= OneOverNum;

	gl_FragColor = vec4( color, 1. );
}
