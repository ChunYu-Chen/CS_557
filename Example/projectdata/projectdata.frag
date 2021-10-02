varying float Temperature;
varying float LightIntensity; 

uniform float Alpha;

void
main( void )
{
	float r, g, b;
	float TMIN =   0.;
	float TMAX = 100.;

	float t = (240./360.) - (240./360.) * ( Temperature - TMIN ) / ( TMAX - TMIN );

	r = g = b = 0.0;
	if( t <= (1./6.) )
	{
		r = 1.;
		g = 6. * t;
	}
	else if( t <= (2./6.) )
	{
		r = 1.  -  6. * ( t - (1./6.) );
		g = 1.;
	}
	else if( t <= (3./6.) )
	{
		g = 1.;
		b = 6. * ( t - (2./6.) );
	}
	else if( t <= (4./6.) )
	{
		g = 1.  -  6. * ( t - (3./6.) );
		b = 1.;
	}
	else if( t <= (5./6.) )
	{
		b = 1.;
		r = 6. * ( t - (4./6.) );
	}
	else
	{
		b = 1.  -  6. * ( t - (5./6.) );
		r = 1.;
	}

	gl_FragColor = vec4( LightIntensity*r, LightIntensity*g, LightIntensity*b, Alpha );
}
