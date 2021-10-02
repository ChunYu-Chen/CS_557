uniform float S, T;
uniform float Power;
uniform sampler2D TexUnit;

void
main()
{
	vec2 st = gl_TexCoord[0].st;

	vec2 delta = st - vec2(S,T);

	st = vec2(S,T) + sign(delta) * pow( abs(delta), vec2( Power, Power ) );

	vec3 rgb = texture2D( TexUnit, st ).rgb;

	gl_FragColor = vec4( rgb, 1. );
}
