import * as React from 'react';
import { sample } from 'lodash';

async function getQuery() {
  try {
    const response = await fetch(
      'https://gist.githubusercontent.com/YajanaRao/3917a962bbe8462ac5083da2186b7c3d/raw/001db7423543f53c0fd72273c333b53d32d50f7d/quotes.json',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function useQuote() {
  let quote = { quote: '', author: '' };
  const data = await getQuery();
  quote = sample(data);

  return { quote, isLoading };
}
