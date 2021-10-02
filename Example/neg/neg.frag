uniform sampler2D ImageUnit;
uniform float T;

void main()
{
	vec2 st = gl_TexCoord[0].st;
	vec3 irgb = texture2D( ImageUnit,  st ).rgb;
	vec3 neg = vec3(1.,1.,1.) - irgb;
	gl_FragColor = vec4( mix( irgb, neg, T ), 1. );
}
