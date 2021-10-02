varying float X, Y;
varying vec4 Color;
varying vec3 MCposition;
varying float LightIntensity; 


void
main( void )
{
	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 LightPos = vec3( 0., 0., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	LightIntensity  = dot( normalize(LightPos - ECposition), tnorm );
	LightIntensity = abs( LightIntensity );
	LightIntensity *= 1.5;

	Color = gl_Color;
	MCposition = vec3( gl_Vertex );
	X = MCposition.x;
	Y = MCposition.y;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
