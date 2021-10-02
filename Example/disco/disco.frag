varying vec3 ECpos;
varying vec4 Color;
varying float LightIntensity; 

uniform float Num;
uniform float Timer;

void
main( void )
{
	const float PI = 3.14159265;
	const vec3 BALLPOS  = vec3( 0., 2., 0. );
	const vec3 LIGHTPOS = vec3( 2., 0., 0. );
	const vec3 LIGHTCOLOR = vec3( 1., 1., 1. );



	int numTheta = int( Num );
	int numPhi   = int( Num );
	float dtheta = 2. * PI / float(numTheta);
	float dphi   =      PI / float(numPhi);

	vec3 BP = ECpos    - BALLPOS;
	vec3 bp;
	float angle = (Timer*360.) * ( PI/180. );
	float c = cos( angle );
	float s = sin( angle );
	bp.x =  c*BP.x + s*BP.z;
	bp.y =  BP.y;
	bp.z = -s*BP.x + c*BP.z;

	vec3 BL = LIGHTPOS - BALLPOS;
	vec3  H = normalize(  normalize(BL) + normalize(bp)  );
	float x = H.x;
	float y = H.y;
	float z = H.z;
	float xz = sqrt( x*x + z*z );
	float phi = atan( y, xz );
	float theta = atan( z, x );

	int itheta = int( floor(  ( theta + dtheta/2. ) / dtheta  ) );
	int iphi   = int( floor(  ( phi   + dphi/2.   ) / dphi    ) );

	float theta0 = dtheta * float(itheta);
	float phi0   = dphi   * float(iphi);

	vec3 N0;
	N0.y = sin(phi0);
	xz   = cos(phi0);
	N0.x = xz*cos(theta0);
	N0.z = xz*sin(theta0);


	float d = max( dot( N0, H ), 0. );
	const float DMIN = 0.980;
	if( d < DMIN )
		d = 0.;
	d = pow( d, 5000. );

	gl_FragColor = vec4( Color.rgb*LightIntensity  +  d * LIGHTCOLOR, Color.a ) ;
}
