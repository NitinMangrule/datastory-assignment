import { Box, Heading, Select, Spinner, VStack, Text } from "@chakra-ui/react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_COUNTRIES, GET_CUBE_DATA } from "../graphql/queries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatMeasure } from "../lib/formatter";

const measures = [
  { label: "Life Expectancy", value: "life_expectancy" },
  { label: "Population", value: "population" },
  { label: "Net Migration Rate", value: "net_migration_rate" },
];

const CountrySelect = ({
  countries,
  onChange,
  isLoading,
}: {
  countries: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
}) => {
  if (isLoading) return <Spinner />;
  return (
    <Select placeholder="Select country" onChange={onChange}>
      {countries.map((country) => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ))}
    </Select>
  );
};

const MeasureSelect = ({
  selectedMeasure,
  onChange,
}: {
  selectedMeasure: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <Select value={selectedMeasure} onChange={onChange}>
    {measures.map((m) => (
      <option key={m.value} value={m.value}>
        {m.label}
      </option>
    ))}
  </Select>
);

const Chart = ({ data, measure }: { data: any[]; measure: string }) => {
  if (!data.length) {
    return <Text>No data available for the selected combination.</Text>;
  }

  return (
    <Box>
      <Text mb={2}>Yearly Data for {formatMeasure(measure)}</Text>
      <LineChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3182CE"
          strokeWidth={2}
        />
      </LineChart>
    </Box>
  );
};

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedMeasure, setSelectedMeasure] =
    useState<string>("life_expectancy");

  const { data, loading: countriesLoading } = useQuery(GET_COUNTRIES);
  const [fetchData, { data: chartData, loading: chartLoading }] =
    useLazyQuery(GET_CUBE_DATA);

  const handleSelection = (country: string, measure: string) => {
    if (country && measure) {
      fetchData({ variables: { country, measure } });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    handleSelection(value, selectedMeasure);
  };

  const handleMeasureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMeasure(value);
    handleSelection(selectedCountry, value);
  };

  return (
    <Box bgGradient="linear(to-br, gray.50, gray.200)" minH="100vh" py={10}>
      <Box
        maxW="800px"
        mx="auto"
        mt={10}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="2xl"
        bgGradient="linear(to-br, white, gray.100)"
      >
        <Heading
          mb={6}
          fontSize="3xl"
          textAlign="center"
          bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Country Insights Dashboard
        </Heading>

        <VStack spacing={8} align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2} color="blue.600">
              Select a Country:
            </Text>
            <CountrySelect
              countries={data?.item || []}
              onChange={handleCountryChange}
              isLoading={countriesLoading}
            />
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2} color="blue.600">
              Select a Measure:
            </Text>
            <MeasureSelect
              selectedMeasure={selectedMeasure}
              onChange={handleMeasureChange}
            />
          </Box>

          <Box
            mt={4}
            p={6}
            borderWidth="1px"
            borderRadius="md"
            bgGradient="linear(to-br, teal.50, teal.100)"
            boxShadow="lg"
            borderColor="teal.200"
          >
            {chartLoading ? (
              <Spinner size="lg" color="teal.500" />
            ) : (
              <Chart
                data={chartData?.cube_cube_M6Lh5is0FtqUhZ || []}
                measure={selectedMeasure}
              />
            )}
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
