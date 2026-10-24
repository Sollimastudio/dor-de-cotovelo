import { test } from "node:test";
import assert from "node:assert/strict";
import { planoInicial } from "../src/lib/plano.ts";
import { temSinalDeRisco } from "../src/lib/risco.ts";
import { carregar, salvar, apagarTudo, estadoInicial, quedaMediaDoImpulso, modulosConcluidos, CHAVE } from "../src/lib/estado.ts";

test("plano inicial segue a especificação e nunca é diagnóstico", () => {
  assert.equal(planoInicial([], "", { dificuldade: "impulso" }).inicio, "sos");
  assert.equal(planoInicial([], "", { repeticoes: ["checar-redes"] }).inicio, "sos");
  assert.equal(planoInicial([], "", { dificuldade: "aceitar" }).inicio, "m1");
  assert.equal(planoInicial(["idas-e-vindas"], "", {}).inicio, "m2");
  assert.equal(planoInicial(["nao-corresponde"], "", {}).inicio, "m2");
  assert.equal(planoInicial(["me-perdi"], "", {}).inicio, "m5");
  assert.equal(planoInicial([], "", {}).inicio, "m1");
  const intenso = planoInicial([], "", { rotina: "muito" });
  assert.equal(intenso.apoioProfissional, true);
  assert.doesNotMatch(intenso.porque, /transtorno|diagnóstico de|você tem/i);
});

test("risco nas palavras da pessoa leva à segurança antes de qualquer exercício", () => {
  for (const t of ["Ele me ameaçou ontem", "não quero mais viver", "estou pensando em me machucar", "tenho medo dele", "penso em tirar a minha própria vida"]) assert.equal(temSinalDeRisco(t), true, t);
  for (const t of ["Ele não respondeu", "estou com saudade", "quero mandar mensagem"]) assert.equal(temSinalDeRisco(t), false, t);
  const p = planoInicial([], "ele me bateu", { dificuldade: "impulso" });
  assert.equal(p.seguranca, true);
  assert.equal(p.inicio, "sos");
});

test("dados ficam só no armazenamento local, podem ser desligados e apagados", () => {
  const mem = new Map();
  const s = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v), removeItem: k => mem.delete(k) };
  const e = { ...estadoInicial(), momento: ["foi-embora"], sos: [{ em: "x", situacao: "mensagem", antes: 8, depois: 4 }, { em: "y", situacao: "saudade", antes: 6, depois: 5 }] };
  salvar(s, e);
  assert.deepEqual(carregar(s).momento, ["foi-embora"]);
  assert.equal(quedaMediaDoImpulso(carregar(s)), 2.5);
  salvar(s, { ...e, guardar: false });
  assert.equal(mem.has(CHAVE), false);
  salvar(s, e);
  assert.deepEqual(apagarTudo(s), estadoInicial());
  assert.equal(mem.has(CHAVE), false);
  mem.set(CHAVE, "{corrompido");
  assert.deepEqual(carregar(s), estadoInicial());
  assert.equal(modulosConcluidos({ ...estadoInicial(), modulos: { m1: { respostas: {}, concluidoEm: "z" }, m2: { respostas: {} } } }), 1);
});
