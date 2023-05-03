import { useVestingsContext } from 'features/vesting';
import {
  Card,
  Container,
  Header,
  DetailsRow,
  DetailsHeader,
  DetailsColumn,
  DetailsValue,
  Details,
  Index,
  Address,
  Badge,
} from './selectVestingStyling';

export const SelectVesting = () => {
  const { vestings } = useVestingsContext();

  return (
    <Container>
      {vestings?.map((vesting, index) => (
        <Card key={vesting.escrow}>
          <Header>
            <Badge address={vesting.escrow} symbols={0} />
            <Index>#{index + 1}</Index>
            <Address>
              {vesting.escrow.slice(0, 4)}...{vesting.escrow.slice(-3)}
            </Address>
          </Header>

          <Details>
            <DetailsRow>
              <DetailsColumn $primary>
                <DetailsHeader>Available</DetailsHeader>
                <DetailsValue>0 LDO</DetailsValue>
              </DetailsColumn>

              <DetailsColumn>
                <DetailsHeader>Locked</DetailsHeader>
                <DetailsValue>300.00 LDO</DetailsValue>
              </DetailsColumn>
            </DetailsRow>

            <DetailsRow>
              <DetailsColumn>
                <DetailsHeader>End date</DetailsHeader>
                <DetailsValue>13 NOV 2023</DetailsValue>
              </DetailsColumn>

              <DetailsColumn $primary>
                <DetailsHeader>Cliff</DetailsHeader>
                <DetailsValue>13 NOV 2023</DetailsValue>
              </DetailsColumn>
            </DetailsRow>
          </Details>
        </Card>
      ))}
    </Container>
  );
};
