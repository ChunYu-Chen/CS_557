#version 330 compatibility

out vec3 vN;
//out vec4 gl_Position;

void main() {
    vN = gl_Normal;
    //normalize(gl_NormalMatrix * gl_Normal);
    gl_Position = gl_Vertex;
}
