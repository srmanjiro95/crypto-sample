import { useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/home";

import { CRYPTOS } from "~/data/cryptos";
import { fetchUsd } from "~/services/coinbase.server";
import type { CryptoCardData, CryptoSymbol } from "~/types/crypto";
import { Dashboard } from "~/components/Dashboard";
import { RouteError } from "~/components/RouteError";
import { requireUser } from "~/utils/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request);
  const symbols = CRYPTOS.map((c) => c.symbol) as CryptoSymbol[];

  const prices = await Promise.all(
    symbols.map(async (s) => [s, await fetchUsd(s)] as const)
  );

  const priceMap = Object.fromEntries(prices) as Record<CryptoSymbol, number>;
  const btcUsd = priceMap.BTC;

  const cards: CryptoCardData[] = CRYPTOS.map((c) => {
    const usd = priceMap[c.symbol];
    return {
      ...c,
      usd,
      btc: c.symbol === "BTC" ? 1 : usd / btcUsd,
    };
  });

  const fetchedAt = new Date().toISOString();

  const formattedFetchedAt = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(fetchedAt));

  return {
    cards,
    fetchedAt,
    formattedFetchedAt,
  };
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";

  return <Dashboard {...data} isLoading={isLoading} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <RouteError
      error={error}
      title="Error loading cryptocurrencies"
    />
  );
}
