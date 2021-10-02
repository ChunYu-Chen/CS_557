varying mat3 NormalMatrix;
varying vec3  MCposition;
varying vec3  ECposition;

void main() 
{
	NormalMatrix = gl_NormalMatrix;

	MCposition = vec3( gl_Vertex );
	ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
