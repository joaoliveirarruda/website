# Vercel Deploy Preparation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar o site Momento (Next.js 16 + React 19) pronto para deploy de produção no Vercel a partir do repositório `joaoliveirarruda/website`.

**Architecture:** Aplicação Next.js 16 App Router com React Compiler ativo, Tailwind v4 e i18n por contexto. Deploy via integração GitHub do Vercel (autodetect), sem necessidade de `vercel.json`. As tarefas focam em: (1) sanear o repo, (2) endurecer a config de produção, (3) garantir que `next build` passa, (4) conectar ao Vercel.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, Tailwind v4, TypeScript 5, framer-motion, ESLint 9.

---

## File Map

- Modify: `package.json` (renomear projeto, adicionar `engines.node`)
- Modify: `next.config.ts` (lockar `eslint`/`typescript` em produção, manter `images.remotePatterns`)
- Modify: `src/app/layout.tsx` (metadata expandida: metadataBase, openGraph, twitter, robots, viewport, canonical)
- Create: `.nvmrc` (versão Node alinhada ao Vercel)
- Delete: `Momento-11x.html`, `Momento-Mockup-updated.html` (mockups na raiz)
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (boilerplate Next)
- Verify: `next build` rodando sem erros
- Reference: `node_modules/next/dist/docs/01-app/02-guides/deploying-to-platforms.md` e `production-checklist.md`

---

## Task 1: Limpar arquivos órfãos do repositório

**Files:**
- Delete: `Momento-11x.html`
- Delete: `Momento-Mockup-updated.html`
- Delete: `public/file.svg`
- Delete: `public/globe.svg`
- Delete: `public/next.svg`
- Delete: `public/vercel.svg`
- Delete: `public/window.svg`

**Por quê:** Os dois HTMLs são mockups de design que vazaram para a raiz do projeto durante o redesign — não fazem parte do build, mas poluem o repo público. Os SVGs em `public/` são boilerplate do `create-next-app` e nenhum componente os referencia.

- [ ] **Step 1: Confirmar que nenhum código importa esses arquivos**

Run:
```bash
grep -rE "Momento-11x|Momento-Mockup|file\.svg|globe\.svg|next\.svg|vercel\.svg|window\.svg" src/ public/ 2>/dev/null
```
Expected: nenhuma saída.

- [ ] **Step 2: Remover os arquivos**

```bash
git rm Momento-11x.html Momento-Mockup-updated.html public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Verificar status**

Run: `git status --short`
Expected: 7 linhas começando com `D`.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove design mockups and create-next-app boilerplate"
```

---

## Task 2: Renomear o pacote e fixar versão do Node

**Files:**
- Modify: `package.json`
- Create: `.nvmrc`

**Por quê:** `name: "temp_next"` é placeholder. Vercel detecta a versão de Node por `engines.node` no `package.json` e/ou `.nvmrc`; fixar evita drift quando o default do Vercel mudar. Next 16 + React 19 requerem Node ≥ 20.

- [ ] **Step 1: Editar `package.json`**

Trocar a linha `"name": "temp_next",` por:
```json
"name": "momento-website",
```

E adicionar antes de `"scripts"`:
```json
"engines": {
  "node": ">=20.18.0"
},
```

- [ ] **Step 2: Criar `.nvmrc`**

```bash
echo "20.18.0" > .nvmrc
```

- [ ] **Step 3: Reinstalar para validar lockfile**

Run: `npm install`
Expected: termina sem erros, `package-lock.json` atualizado com novo `name`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .nvmrc
git commit -m "chore: rename package to momento-website and pin node 20.18"
```

---

## Task 3: Endurecer `next.config.ts` para builds de produção

**Files:**
- Modify: `next.config.ts`

**Por quê:** Por padrão, Next 16 já falha o build em erros de TS e ESLint, mas é bom ser explícito (e garantir que não sejam bypassed silenciosamente). Sem isso, um deploy do Vercel pode passar com tipos quebrados se alguém adicionar `ignoreBuildErrors: true` futuramente sem revisão.

- [ ] **Step 1: Atualizar `next.config.ts`**

Substituir o conteúdo de `next.config.ts` por:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verificar tipo do config**

Run: `npx tsc --noEmit`
Expected: termina sem erros.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore(next): explicit production guards in next.config"
```

---

## Task 4: Expandir metadata para SEO e compartilhamento social

**Files:**
- Modify: `src/app/layout.tsx`

**Por quê:** O `metadata` atual só tem `title` e `description`. Para um site público linkado em redes sociais, faltam: `metadataBase` (resolve URLs relativas em OG), `openGraph`, `twitter`, `robots`, `icons`, e `viewport`. Sem `metadataBase`, qualquer imagem OG quebra quando compartilhada.

- [ ] **Step 1: Substituir `src/app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://momento.app.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Momento — Find Your Mentor",
    template: "%s | Momento",
  },
  description:
    "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
  applicationName: "Momento",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Momento",
    title: "Momento — Find Your Mentor",
    description:
      "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Momento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momento — Find Your Mentor",
    description:
      "Conectando estudantes universitários ao mercado de trabalho através de mentoria e comunidade.",
    images: ["/assets/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

> **Nota:** Confirme com o usuário se `https://momento.app.br` é o domínio real. Se for outro, substitua a constante `SITE_URL` (ou defina `NEXT_PUBLIC_SITE_URL` no Vercel).

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: termina sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): expand metadata with OpenGraph, Twitter and viewport"
```

---

## Task 5: Garantir que o build de produção passa

**Files:**
- Verify: build artifact em `.next/`

**Por quê:** Esta é a verificação que prova que o deploy vai funcionar. O Vercel roda `next build` no servidor deles — se passa local, passa lá (salvo env vars).

- [ ] **Step 1: Limpar build anterior**

Run: `rm -rf .next`

- [ ] **Step 2: Rodar build de produção**

Run: `npm run build`
Expected: termina com `✓ Compiled successfully` e tabela de rotas (`/` deve aparecer como Static `○` ou Static prerender).

- [ ] **Step 3: Se houver erro de lint/tipo, corrigir e repetir**

Erros comuns nesse projeto:
- Imports não usados em `src/components/*.tsx` → remover.
- Uso de `<img>` em vez de `<Image>` (warning, não fail) → ignorar por ora se for só warning.
- Tipos faltando em handlers do `LanguageContext` → tipar explicitamente.

Re-rodar até build limpo.

- [ ] **Step 4: Smoke test do servidor de produção**

Run em terminal separado: `npm run start`
Em outro terminal: `curl -sI http://localhost:3000 | head -3`
Expected: `HTTP/1.1 200 OK`.
Parar com Ctrl+C.

- [ ] **Step 5: Commit qualquer correção feita**

```bash
git add -A
git commit -m "fix: resolve production build errors"
```

(Skipar o commit se não houve correção.)

---

## Task 6: Push final e conexão com Vercel

**Files:**
- Externo: dashboard do Vercel

**Por quê:** Com o repo limpo e o build passando, conectar ao Vercel é só importar. Não precisa de `vercel.json` porque o Vercel detecta Next.js automaticamente.

- [ ] **Step 1: Push de todas as mudanças**

```bash
git push origin main
```

- [ ] **Step 2: Importar no Vercel (manual)**

1. Acessar https://vercel.com/new
2. Import Git Repository → selecionar `joaoliveirarruda/website`
3. Framework preset: deve aparecer "Next.js" automaticamente
4. Root Directory: `./` (default)
5. Build Command: deixar default (`next build`)
6. Output Directory: deixar default (`.next`)
7. Node.js Version: confirmar `20.x`

- [ ] **Step 3: Configurar variáveis de ambiente no Vercel**

Em Settings → Environment Variables, adicionar (Production + Preview):
- `NEXT_PUBLIC_SITE_URL` = URL final de produção (ex: `https://momento.vercel.app` ou domínio custom)

> Se o usuário ainda não tem domínio próprio, usar a URL `*.vercel.app` que o Vercel atribui após o primeiro deploy, e atualizar essa env var depois.

- [ ] **Step 4: Trigger do primeiro deploy**

Clicar **Deploy**. Aguardar build (~2-4min).
Expected: status `Ready` em verde, URL clicável.

- [ ] **Step 5: Verificar deploy**

Abrir a URL fornecida pelo Vercel e checar:
- Página carrega
- Hero, About, Services, Footer renderizam
- Imagens em `/assets/*` aparecem
- Console do browser sem erros 404 ou de hidratação

- [ ] **Step 6: (Opcional) Conectar domínio custom**

Em Settings → Domains, adicionar o domínio. Atualizar `NEXT_PUBLIC_SITE_URL` para esse domínio e redeployar (Deployments → ⋯ → Redeploy).

---

## Done When

- `main` no GitHub está limpo (sem mockups HTML, sem SVGs boilerplate)
- `npm run build` local passa sem erros
- Vercel está deployando automaticamente em pushes pra `main`
- URL de produção responde 200 e renderiza o site corretamente
