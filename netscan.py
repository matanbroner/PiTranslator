import subprocess
from multiprocessing import Pool

possible = []

def f(x):
    s = subprocess.run(["ping", "-c", "1", "-w", "1", f"192.168.0.{x}"])
    if s.returncode == 0:
        return x
    else:
        return None

to_mp = list(range(100, 256))
with Pool(processes=len(to_mp)) as pool:
    l = pool.map(f, to_mp)

    print([ll for ll in l if ll is not None])