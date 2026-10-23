'use client';

import { useState } from 'react';
import { site } from '@/config/site';

/** Escape exigido pelo vCard: barra invertida antes de ; , e quebras de linha. */
function escapar(valor: string): string {
  return valor.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * vCard montada a partir da mesma configuração do site — sem segunda fonte de
 * verdade para telefone, nome ou endereço. Só entram dados profissionais
 * públicos; campo vazio simplesmente não é escrito.
 */
function montarVCard(): string {
  // Nome de família vem da configuração: dividir pelo espaço erraria em
  // sobrenomes compostos, que são a regra em nomes brasileiros.
  const sobrenome = site.nomeFamilia;
  const primeiro = site.nomeCompleto.replace(new RegExp(`\\s*${sobrenome}\\s*$`), '').trim();

  const linhas = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapar(sobrenome)};${escapar(primeiro)};;;`,
    `FN:${escapar(site.nomeCompleto)}`,
    `ORG:${escapar(site.marca)}`,
    `TITLE:${escapar(`Advogado · ${site.oab}`)}`,
    `URL:${site.dominio}`,
  ];

  if (site.whatsapp) linhas.push(`TEL;TYPE=CELL,VOICE:+${site.whatsapp.replace(/\D/g, '')}`);
  if (site.telefone) linhas.push(`TEL;TYPE=WORK,VOICE:${escapar(site.telefone)}`);
  if (site.email) linhas.push(`EMAIL;TYPE=INTERNET,WORK:${escapar(site.email)}`);

  if (site.endereco) {
    const { logradouro, complemento, bairro, cidade, uf, cep } = site.endereco;
    const rua = [logradouro, complemento, bairro].filter(Boolean).join(', ');
    linhas.push(`ADR;TYPE=WORK:;;${escapar(rua)};${escapar(cidade)};${escapar(uf)};${escapar(cep)};Brasil`);
  } else {
    linhas.push(`ADR;TYPE=WORK:;;;${escapar(site.cidadeBase)};${escapar(site.uf)};;Brasil`);
  }

  linhas.push('END:VCARD');
  return linhas.join('\r\n');
}

const classeAcao =
  'inline-flex min-h-[2.875rem] items-center justify-center gap-2 rounded-full border border-linha-forte px-6 ' +
  'text-[0.9375rem] transition-colors hover:border-verde hover:text-verde';

export function AcoesCartao({ url }: { url: string }) {
  const [aviso, setAviso] = useState<string | null>(null);

  function baixarContato() {
    const blob = new Blob([montarVCard()], { type: 'text/vcard;charset=utf-8' });
    const endereco = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = endereco;
    link.download = 'gabriel-dalla-costa.vcf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(endereco);
    setAviso('Arquivo de contato baixado.');
  }

  async function compartilhar() {
    const dados = { title: site.marca, text: `${site.nomeCompleto} · ${site.oab}`, url };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(dados);
        return;
      } catch {
        // Compartilhamento cancelado ou indisponível: cai na cópia do link.
      }
    }

    await copiarLink();
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(url);
      setAviso('Link copiado.');
    } catch {
      setAviso(`Copie manualmente: ${url}`);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={baixarContato} className={classeAcao}>
          Salvar contato
        </button>
        <button type="button" onClick={compartilhar} className={classeAcao}>
          Compartilhar
        </button>
        <button type="button" onClick={copiarLink} className={classeAcao}>
          Copiar link
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-nota text-tinta-tenue">
        {aviso}
      </p>
    </div>
  );
}
