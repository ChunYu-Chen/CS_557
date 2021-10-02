varying vec4 Color;
varying float LightIntensity; 

uniform float Diam;
uniform float Tol;
uniform vec4  DotColor;

void
main( void )
{
        float sp = 2. * gl_TexCoord[0].s;
        float tp = gl_TexCoord[0].t;
        float numins = float( int( sp / Diam ) );
        float numint = float( int( tp / Diam ) );

        gl_FragColor = Color;
        if( mod( numins+numint, 2. ) == 0. )
        {
		sp = sp - numins*Diam;
		tp = tp - numint*Diam;
		float radius = Diam/2.;
		vec3 sptp =  vec3( sp, tp, 0. );
		vec3 cntr =  vec3( radius, radius, 0. );
		float d = distance( sptp, cntr );
		float t = smoothstep( radius-Tol, radius+Tol, d );
		gl_FragColor = mix( DotColor, Color, t );
        }

	gl_FragColor.rgb *= LightIntensity;
}
