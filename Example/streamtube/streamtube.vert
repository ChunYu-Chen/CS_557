const float R = 2.;
const float PI = 3.14159265;
const float TWOPI = 2.*PI;

uniform float N;
uniform float K;
// uniform float M;
uniform float Timer;
uniform float Peristaltic;
uniform float Speed;

varying vec4  Color;
varying float LightIntensity;

void
main( void )
{
	const float PI = 3.14159265;
	const float HALFWIDTH = 0.10;

	Color = gl_Color;

	vec3 vertex = gl_Vertex.xyz;

	float t = .5 * ( vertex.x + 1. );		// change [-1.,1.] to [0.,1.]

	float time = fract( Speed*Timer );
	if( time-HALFWIDTH <= t  &&  t <= time+HALFWIDTH )
	{
		float mag = 1.   +   Peristaltic * ( 1. + cos(  PI*(t-time)/HALFWIDTH  ) ) / 2.;
		vertex.yz *= vec2(mag,mag);
	}

	float x = R*cos( TWOPI*N*t );
	float y = R*sin( TWOPI*N*t );
	float z = K * t;

	float xd = -R*TWOPI*N*sin( TWOPI*N*t );
	float yd =  R*TWOPI*N*cos( TWOPI*N*t );
	float zd = K;

	float xdd = -( TWOPI*TWOPI*N*N ) * x;
	float ydd = -( TWOPI*TWOPI*N*N ) * y;
	float zdd =  0.;

	vec3 T = normalize( vec3(xd,yd,zd) );
	vec3 B = normalize( cross( vec3(xd,yd,zd), vec3(xdd,ydd,zdd) ) );
	vec3 N = normalize( cross(B,T) );

	vec3 xyz = vec3( 0., vertex.y, vertex.z );

	float xp = dot( vec3(T.x,N.x,B.x), xyz );
	float yp = dot( vec3(T.y,N.y,B.y), xyz );
	float zp = dot( vec3(T.z,N.z,B.z), xyz );

	vec3 newposition = vec3( x+xp, y+yp, z+zp );
	vec3 tpos = vec3( gl_ModelViewMatrix * vec4( newposition, 1. ) );

	float nxp = dot( T, gl_Normal );
	float nyp = dot( N, gl_Normal );
	float nzp = dot( B, gl_Normal );
	vec3 newnormal = vec3(nxp,nyp,nzp);
    	vec3 tnorm = normalize( gl_NormalMatrix * newnormal );

	vec3 LightPos = vec3( 5., 5., 10. );

    	LightIntensity  = dot( normalize(LightPos - tpos), tnorm );
    	LightIntensity = abs( LightIntensity );
    	// LightIntensity *= 1.5;

	gl_Position = gl_ModelViewProjectionMatrix * vec4( newposition, 1. );
}
