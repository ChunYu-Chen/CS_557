#version 330 compatibility

out vec2 vST;
out vec3 vMCposition;
out vec3 ECposition;

void main( )
{
    vST = gl_MultiTexCoord0.st;

    vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    
    vMCposition = vec3( gl_Vertex );

    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
