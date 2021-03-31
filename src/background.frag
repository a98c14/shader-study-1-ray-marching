struct ObjectData {
  vec3  color;
  vec3  position;
  float radius;
};

struct Intersection {
  vec3  color;
  vec3  position;
  float radius;
};

#define SCENE_OBJECT_COUNT 5
#define MAX_STEP_COUNT 30
#define COLLISION_THRESHOLD .01

uniform float      uStepSize;
uniform float      uStepCount;
uniform vec3       uBackgroundColor;
uniform ObjectData uScene[SCENE_OBJECT_COUNT];
uniform vec3       uLightPos;

varying vec2       vUv;


float distanceToClosestObject(vec3 origin, out vec3 color) {
  float closest = 10000.;
  for(int i = 0; i < SCENE_OBJECT_COUNT; i++) {
    vec3 target = uScene[i].position;
    float radius = uScene[i].radius;
    float dist = distance(origin, target) - radius;
    if(dist < closest) {
      closest = dist;
      color = uScene[i].color;
    }
  }
  return closest;
}

float castRay(vec3 origin, vec3 direction, out vec3 color, out vec3 collisionPoint) {
  for(int i = 0 ;i < MAX_STEP_COUNT; i++) {
    float dist = distanceToClosestObject(origin, color);
    if(dist > 10.)
      return 0.0;
    if(dist < COLLISION_THRESHOLD) {
      collisionPoint = origin;
      return 1.0;
    } else {
      origin += direction * dist;
    }
  }
}

void main() {
  vec3 spherePos = vec3(0., 0., 3.0);
  float sphereRadius = 1.0;

  vec3 uv = vec3((vUv - 0.5) * 2.0, 1.0);
  vec3 dir = normalize(uv);
  vec3 pos = vec3(0., 0., 0.0);
  vec3 color;
  vec3 collisionPoint;
  float hasIntersected = castRay(pos, dir, color, collisionPoint);
  vec3 lightDir = normalize(collisionPoint - uLightPos);
  vec3 lightColor;
  vec3 lightCollisionPoint;
  float lightIntersection = castRay(uLightPos, lightDir, lightColor, lightCollisionPoint);
  float hasLight = 1. - smoothstep(0., 1.0, distance(collisionPoint, lightCollisionPoint));
  gl_FragColor = vec4(vec3(hasLight * hasIntersected) * color, 1.0);
}