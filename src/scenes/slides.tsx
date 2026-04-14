import { Code, Img, Latex, Layout, Txt } from '@motion-canvas/2d';
import { beginSlide, createRef, fadeTransition, waitFor, map, tween, all, easeInBack, easeOutCirc, easeOutCubic } from '@motion-canvas/core';
import { makeSlide } from './makeSlide';



export const title = makeSlide("title", function* (view) {
  view.add(
    <Layout direction={"column"} alignItems={"center"} gap={16} layout>
      <Txt fontWeight={600} fontSize={60}>Czy program to dowód matematyczny?</Txt>
      <Txt fontSize={30}>Logiczne podstawy teorii typów</Txt>
    </Layout>
  )
})



export const voevodsky = makeSlide("voevodsky", function* (view) {
  view.add(
    <Layout direction="column" alignItems="center" gap={16} layout>
      <Img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/VladimirVoevodsky.jpg/250px-VladimirVoevodsky.jpg"
        width={250 * 1.5}
        height={300 * 1.5}
      />
      <Txt>Vladimir Voevodsky</Txt>
    </Layout>
  )
})


export const sylogizm = makeSlide(null, function* (view) {
  const codeNode = createRef<Code>();

  view.add(
    <Layout direction="column" alignItems="center" gap={100} layout>
      <Layout direction="column" alignItems="center" gap={16}>
        <Txt >Prawo sylogizmu hipotetycznego</Txt>
        <Latex
          tex="(A \implies B) \implies (B \implies C) \implies (A \implies C)"
          fill="black"
        />
      </Layout>
      <Code
        ref={codeNode}
        code={"fun ab -> fun bc -> fun a -> bc (ab a) ;;"}
        opacity={0}
        fontSize={60}
        fill="gray"
      />
    </Layout>
  );


  yield* fadeTransition(0.5);
  yield* beginSlide("sylogizm.1");
  yield* waitFor(0.5)
  yield* codeNode().opacity(1, 0.5);

  yield* beginSlide("sylogizm.2");
})

export const church = makeSlide(null, function* (view) {
  const imageStack = createRef<Layout>()
  const lambda = createRef<Latex>()

  view.add(
    <>
      <Layout ref={imageStack} direction="column" alignItems="center" gap={16} layout position={[0, 0]}>
        <Img
          src="https://upload.wikimedia.org/wikipedia/en/a/a6/Alonzo_Church.jpg"
          width={235 * 1.5}
          height={314 * 1.5}
        />
        <Txt>Alonzo Church</Txt>
      </Layout>
      <Latex
        ref={lambda}
        fill="black"
        tex="\lambda \text{-calculus}"
        position={[300, 0]}
        fontSize={100}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("church.1");

  yield* all(
    imageStack().x(0, 0).to(-300, 1, easeOutCubic),
    lambda().opacity(1, 1)
  )

  yield* beginSlide("church.2");
})



export const lambda1 = makeSlide(null, function* (view) {
  const func = createRef<Latex>()
  const lambda = createRef<Latex>()
  const app = createRef<Latex>()

  view.add(
    <>
      <Latex
        ref={func}
        tex="f(x) = x^2 + 1"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={lambda}
        tex="f({{x}}) = {{x^2 + 1}}"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={app}
        tex="{{f}}\  {{2}}"
        fill="black"
        opacity={0}
        fontSize={70}
        position={[0, 200]}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("lambda1.1");

  yield* all(
    func().y(0, 0).to(-200, 0.5),
    lambda().y(0, 0).to(200, 0.5),

  )
  yield* lambda().tex("{{ \\lambda }} {{x}} {{.}} {{x^2 + 1}}", 1)
  yield* beginSlide("lambda1.2")

  yield* lambda().tex("{{f = }}{{ \\lambda }} {{x}} {{.}} {{x^2 + 1}}", 1)
  yield* beginSlide("lambda1.3")

  yield* all(
    func().opacity(0, 0.3),
    lambda().y(200, 0).to(-200, 0.5),
  )

  yield* app().opacity(1, 0.3)

  yield* beginSlide("lambda1.4")

  yield* app().tex("{{(\\lambda x.}} {{x}}{{^2}} {{+ 1}}{{)\ }} {{2}}", 1)

  yield* beginSlide("lambda1.5")

  yield* app().tex(" {{2}}{{^2}} {{+ 1}}", 1)
  yield* beginSlide("lambda1.6")

  yield* app().tex("{{2}}{{^2}} {{+ 1}} {{\\rightsquigarrow 5}}", 1)
  yield* beginSlide("lambda1.7")
})

export const lambda2 = makeSlide(null, function* (view) {

})

