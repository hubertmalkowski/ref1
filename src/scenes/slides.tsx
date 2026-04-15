import { Code, Img, Latex, Layout, Txt } from '@motion-canvas/2d';
import { beginSlide, createRef, fadeTransition, waitFor, map, tween, all, easeInBack, easeOutCirc, easeOutCubic, loop } from '@motion-canvas/core';
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
  const apply = createRef<Latex>()
  const result = createRef<Latex>()

  view.add(
    <>

      <Latex
        ref={apply}
        tex="{{\text{apply}}} = {{\lambda f.}} {{\lambda x.}} {{f}}\ {{x}}"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={result}
        tex="\text{apply}\ (\lambda n.n^2+1)\ 2 \rightsquigarrow 5"
        fill="black"
        fontSize={70}
        position={[0, 100]}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("lambda2.1")

  yield* apply().tex("{{(}} {{\\lambda f.}} {{\\lambda x.}} {{f}}\\ {{x}} {{)\\ }} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\", 1)

  yield* beginSlide("lambda2.2")

  yield* apply().tex("{{(}} {{\\lambda x.}} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{x}} {{)\\ }} ", 1)

  yield* beginSlide("lambda2.3")

  yield* apply().tex("{{(}} {{\\lambda x.}} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{x}} {{)\\ }} {{2}} ", 1)
  yield* apply().tex(" {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{2}} ", 1)
  yield* apply().tex(" {{2}}{{^2 + 1}}", 1)
  yield* apply().tex(" {{2}}{{^2 + 1}}{{\\rightsquigarrow 5}}", 1)
  yield* beginSlide("lambda2.4")

  yield* apply().tex("{{\\text{apply}}} = {{\\lambda f.}} {{\\lambda x.}} {{f}}\ {{x}}", 1)
  yield* all(
    result().opacity(100, 0.5),
    apply().y(0, 0).to(-100, 0.5),
  )
  yield* beginSlide("lambda2.5")
})


export const omega = makeSlide(null, function* (view) {

  const func = createRef<Latex>()
  // const lambda = createRef<Latex>()
  // const app = createRef<Latex>()
  //
  view.add(
    <>
      <Latex
        ref={func}
        tex="{{(\lambda x.}} {{x}}\ {{x}}{{)}}\ {{(\lambda x. x\ x)}}"
        fill="black"
        fontSize={70}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("omega.0")

  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)


})

export const stlc1 = makeSlide(null, function* (view) {
  const func = createRef<Latex>()

  view.add(
    <>
      <Latex
        ref={func}
        tex="{{\lambda\ }} {{x}}{{.x^2 + 1}}"
        fill="black"
        fontSize={70}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc1.1")

  yield* func().tex("{{ \\lambda\\ }} {{x}}{{:\\text{Nat}\\ }}{{.x^2 + 1}}", 1)
  yield* beginSlide("stlc1.2")
})



export const stlc2 = makeSlide(null, function* (view) {

  const arrow = createRef<Latex>()


  view.add(
    <>
      <Latex
        tex="\text{Int},\ \text{Bool},\ \text{Nat},\ \text{B},\ \text{A} \dots"
        fill="black"
        fontSize={70}
        position={[0, -100]}
      />


      <Latex
        ref={arrow}
        tex="A \rightarrow B"
        fill="black"
        fontSize={70}
        position={[0, 100]}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc2.1")

  yield* arrow().opacity(100, 1)



  yield* beginSlide("stlc2.2")
})





export const stlc3 = makeSlide(null, function* (view) {
  const expr1 = createRef<Latex>()
  const expr2 = createRef<Latex>()
  const expr3 = createRef<Latex>()
  const expr4 = createRef<Latex>()

  view.add(
    <Layout direction="column" alignItems="center" gap={60} layout>
      <Latex ref={expr1} tex="{{5}}" fill="black" fontSize={60} />
      <Latex ref={expr2} tex="{{F = \lambda\ x : \text{Nat}\ .\ x^2}}" fill="black" fontSize={60} />
      <Latex ref={expr3} tex="F\ 2" fill="black" fontSize={60} />
      <Latex ref={expr4} tex="{{\lambda\ a : \text{Nat}\ .\ \lambda\ b : \text{Nat}\ .\ \dfrac{a}{b}}}" fill="black" fontSize={60} />
    </Layout>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc3.1")

  yield* expr1().tex("{{5}} {{\\quad : \\quad \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.2")

  yield* expr2().tex("{{F = \\lambda\\ x : \\text{Nat}\\ .\\ x^2}} {{\\quad : \\quad \\text{Nat} \\rightarrow \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.3")

  yield* expr3().tex("{{F\\ 2 }}{{\\quad : \\quad \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.4")

  yield* expr4().tex("{{\\lambda\\ a : \\text{Nat}\\ .\\ \\lambda\\ b : \\text{Nat}\\ .\\ \\dfrac{a}{b}}} {{\\quad : \\quad \\text{Nat} \\rightarrow \\text{Nat} \\rightarrow \\mathbb{Q}}}", 1)
  yield* beginSlide("stlc3.5")
})

