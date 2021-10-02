#version 330 compatibility

out vec2 vST;

void main( )
{
        vST = gl_MultiTexCoord0.st; //convey s and t to fragment
        gl_Position     = gl_ModelViewProjectionMatrix * gl_Vertex;
}