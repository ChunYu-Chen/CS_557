#version 330 compatibility

out vec2 vST;
out vec3 MCposition;
out vec3 ECposition;
//const vec3 LIGHTPOS = const vec3( -2., 0., 10.);

void main( )
{
    vST = gl_MultiTexCoord0.st;
    
    vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );

    MCposition = vec3( gl_Vertex );

    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
