import Counter from './Counter';
import Logo from './Logo';

export default function Header({ itemsCompleted, itemsTotal }) {
  return (
    <header>
      <Logo />
      <Counter itemsCompleted={itemsCompleted} itemsTotal={itemsTotal} />
    </header>
  );
}
