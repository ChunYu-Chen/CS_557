varying float Temperature;
uniform float Min;
uniform float Max;
uniform float Alpha;

const float TMIN =   0.;
const float TMAX = 100.;


void
main( void )
{
	float r, g, b;

	if( Temperature < Min )
		discard;

	if( Temperature > Max )
		discard;


	float t = (240./360.) - (240./360.) * ( Temperature - TMIN ) / ( TMAX - TMIN );

	r = 1.;
	g = 0.0;
	b = 1.  -  6. * ( t - (5./6.) );

	if( t <= (5./6.) )
	{
		r = 6. * ( t - (4./6.) );
		g = 0.;
		b = 1.;
	}

	if( t <= (4./6.) )
	{
		r = 0.;
		g = 1.  -  6. * ( t - (3./6.) );
		b = 1.;
	}

	if( t <= (3./6.) )
	{
		r = 0.;
		g = 1.;
		b = 6. * ( t - (2./6.) );
	}

	if( t <= (2./6.) )
	{
		r = 1.  -  6. * ( t - (1./6.) );
		g = 1.;
		b = 0.;
	}

	if( t <= (1./6.) )
	{
		r = 1.;
		g = 6. * t;
	}

	gl_FragColor = vec4( r, g, b, Alpha );
}
