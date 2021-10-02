uniform samplerCube TexUnit;
uniform float Brickx, Groutx;
uniform float Brickz, Groutz;
uniform float Mixer;

varying vec3  MCposition;
varying vec3  ECposition;
varying mat3 NormalMatrix;


void main()
{
	vec4 WHITE = vec4( 1., 1., 1., 1. );

	float X = ECposition.x;
	float Y = ECposition.y;
	float Z = ECposition.z;

	float deltax = Brickx + Groutx;
	float deltaz = Brickz + Groutz;

	float modx = mod( abs(X), deltax );	// 0. <= modx < deltax
	float modz = mod( abs(Z), deltaz );	// 0. <= modz < deltaz

	vec3 normal;

	if( modx > Brickx )
	{
		float rad = Groutx/2.;
		float xc = sign(X) * ( Brickx + rad );
		float yc = Y;
		float zc = Z;

		float xp = sign(X) * modx;
		float xr = xp - xc;
		float yp = Y - sqrt( rad*rad - xr*xr );
		float zp = Z;

		normal = normalize( vec3( xc-xp, yc-yp, zc-zp ) );
	}
	else if( abs(X) < Groutx/2. )
	{
		float rad = Groutx/2.;
		float xc = 0.;
		float yc = Y;
		float zc = Z;

		float xp = X;
		float xr = xp - xc;
		float yp = Y - sqrt( rad*rad - xr*xr );
		float zp = Z;

		normal = normalize( vec3( xc-xp, yc-yp, zc-zp ) );
	}
	else if( modz > Brickz )
	{
		float rad = Groutz/2.;
		float zc = sign(Z) * ( Brickz + rad );
		float yc = Y;
		float xc = X;

		float zp = sign(Z) * modz;
		float zr = zp - zc;
		float yp = Y - sqrt( rad*rad - zr*zr );
		float xp = X;

		normal = normalize( vec3( xc-xp, yc-yp, zc-zp ) );
	}
	else if( abs(Z) < Groutz/2. )
	{
		float rad = Groutz/2.;
		float zc = 0.;
		float yc = Y;
		float xc = X;

		float zp = Z;
		float zr = zp - zc;
		float yp = Y - sqrt( rad*rad - zr*zr );
		float xp = X;

		normal = normalize( vec3( xc-xp, yc-yp, zc-zp ) );
	}
	else
	{
		normal = vec3( 0., 1., 0. );
	}

	normal = normalize( NormalMatrix * normal );
	if( normal.z < 0. )
	{
		normal *= -1.;
	}

	vec3 ReflectVector = reflect( normalize(ECposition), normal );
	vec3 RefractVector = refract( normalize(ECposition), normal, .66 );

#ifdef VIEW_INDEPENDENT
	vec3 normal = normalize( vec3( up, vp, wp ) );
	vec3 ReflectVector = reflect( MCposition, normal );
#endif

	vec4 reflectcolor = textureCube( TexUnit, ReflectVector );
	vec4 refractcolor = mix( textureCube( TexUnit, RefractVector ), WHITE, 0.2 );

	gl_FragColor = vec4( mix( reflectcolor.rgb, refractcolor.rgb, Mixer ), 1. );
}
