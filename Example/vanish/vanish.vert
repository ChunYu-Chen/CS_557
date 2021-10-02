varying float LightIntensity;

void main()
{
	vec3 LightPos = vec3( 10., 5., 5. );

	gl_TexCoord[0]  = gl_MultiTexCoord0;

	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
	vec3 lightVec   = normalize( LightPos - ECposition );

	LightIntensity  = 1.5 * abs( dot(lightVec, tnorm) );
	if( LightIntensity < .2 )
		LightIntensity = .2;

	gl_Position     = gl_ModelViewProjectionMatrix * gl_Vertex;
}
