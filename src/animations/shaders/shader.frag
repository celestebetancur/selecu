#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float iTime;
vec2 r = u_resolution.xy;

vec4 osc(vec2 _st, float frequency, float sync, float offset) {
    vec2 st = _st;
   float r = sin((st.x-offset/frequency+iTime*sync)*frequency)*0.5  + 0.5;
   float g = sin((st.x+iTime*sync)*frequency)*0.5 + 0.5;
   float b = sin((st.x+offset/frequency+iTime*sync)*frequency)*0.5  + 0.5;
   return vec4(r, g, b, 1.0);
  }

vec2 kaleid(vec2 _st, float nSides) {
  vec2 st = _st;
   st -= 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return r*vec2(cos(a), sin(a));
  }

  void main () {
		vec3 c;
		float l,z=iTime;
		for(int i=0;i<3;i++) {
			vec2 uv,p=gl_FragCoord.xy/r;
			uv=p;
			p-=.5;
			p.x*=r.x/r.y;
			z+=0.7;
			l=length(p);
			uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z*2.));
			c[i]=.01/length(abs(mod(uv,1.)-.5));
		}
		vec3 canvas = vec3(c.x,c.y,c.z);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
		vec4 hydra = osc(kaleid(st, 3.), 4., 0.4, 8.);
    gl_FragColor = vec4(canvas.x*hydra.x,canvas.y*hydra.y,hydra.z*canvas.z,.9);
  }
