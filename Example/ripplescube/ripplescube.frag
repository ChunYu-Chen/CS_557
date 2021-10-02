uniform float Time;
uniform float Amp0, Amp1;
uniform float PhaseShift;
uniform float Pd;
varying mat3 normalmatrix;
uniform samplerCube TexUnit;

varying vec3  MCposition;
varying vec3  ECposition;


void main()
{
	const float TWOPI = 2.*3.14159265;
	vec3 C0 = vec3( -1., MCposition.y, 0. );
	// const vec3 C1 = vec3(  2.5, 0., 0. );

	float rad0 = length( MCposition - C0 );
	float H0 = -Amp0 * cos( TWOPI*rad0/Pd - TWOPI*Time ); 

	// float rad1 = length( MCposition - C1 );
	// float H1 = -Amp1 * cos( TWOPI*rad1/Pd - TWOPI*Time ); 

	float u = -Amp0 * (TWOPI/Pd) * sin( TWOPI*rad0/Pd - TWOPI*Time ); 
	float v = 1.;
	float w = 0.;

	float ang = atan( MCposition.z - C0.z, MCposition.x - C0.x );
	float up = dot( vec2(u,w), vec2(cos(ang), -sin(ang)) );
	float vp = 1.;
	float wp = dot( vec2(u,w), vec2(sin(ang),  cos(ang)) );

	vec3 normal = normalize( vec3( up, vp, wp ) );
	normal = normalize( normalmatrix * normal );

	if( normal.z < 0. )
	{
		normal *= -1.;
	}

	vec3 ReflectVector = reflect( ECposition, normal );
	// ReflectVector = normalize( ReflectVector * normalmatrix );

#ifdef VIEW_INDEPENDENT
	vec3 normal = normalize( vec3( up, vp, wp ) );
	vec3 ReflectVector = reflect( MCposition, normal );
#endif

	gl_FragColor = textureCube( TexUnit, ReflectVector );
}
