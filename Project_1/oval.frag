#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uTol;

in vec3 vColor;
in float vLightIntensity;
in vec2 vST;
const vec3 WHITE = vec3( 1., 1., 1. );

void
main( )
{
  int numins = int( vST.s / uAd );
  int numint = int( vST.t / uBd );

  float Ar = uAd/2.;
  float Br = uBd/2.;
  float sc = numins *uAd + Ar;
  float tc = numint *uBd + Br;

  float rfrac = (vST.s-sc)*(vST.s-sc) / (Ar*Ar) + 
                (vST.t-tc)*(vST.t-tc) / (Br*Br);

  float t = smoothstep( 1-uTol, 1+uTol, rfrac );
  vec3 rgb = vLightIntensity * mix( vColor,WHITE, t );
  gl_FragColor = vec4( rgb, 1. );
}
